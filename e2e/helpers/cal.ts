import type { Page } from "@playwright/test";

export type CalMockMode = "ready" | "failure" | "no-slots" | "manual";

type CalMockCall = {
  namespace: string;
  command: string;
  payload?: Record<string, unknown>;
};

declare global {
  interface Window {
    __calMock: {
      calls: CalMockCall[];
      emit: (
        action: string,
        data?: Record<string, unknown>,
        namespace?: string,
      ) => void;
    };
  }
}

export async function mockCalEmbed(
  page: Page,
  mode: CalMockMode = "ready",
) {
  await page.addInitScript((initialMode: CalMockMode) => {
    type Handler = (event: { detail: { data: Record<string, unknown> } }) => void;
    type MockApi = ((command: string, payload?: Record<string, unknown>) => void) & {
      handlers: Map<string, Set<Handler>>;
    };

    const calls: CalMockCall[] = [];
    const namespaces: Record<string, MockApi> = {};

    function dispatch(
      namespace: string,
      action: string,
      data: Record<string, unknown> = {},
    ) {
      for (const callback of namespaces[namespace]?.handlers.get(action) ?? []) {
        callback({ detail: { data } });
      }
    }

    function createApi(namespace: string): MockApi {
      const handlers = new Map<string, Set<Handler>>();
      const api = ((command: string, payload: Record<string, unknown> = {}) => {
        calls.push({ namespace, command, payload });

        if (command === "inline") {
          const mount = payload.elementOrSelector as HTMLElement | undefined;
          if (mount) {
            const frame = document.createElement("iframe");
            frame.title = "Cal.com booking calendar";
            frame.dataset.calLink = String(payload.calLink ?? "");
            frame.style.width = "100%";
            frame.style.height = "720px";
            frame.style.border = "0";
            frame.srcdoc = `<p>${
              initialMode === "no-slots"
                ? "No times available"
                : "Choose a date and time"
            }</p>`;
            mount.replaceChildren(frame);
          }
        }

        if (command === "on") {
          const action = String(payload.action ?? "");
          const callback = payload.callback as Handler | undefined;
          if (!callback) return;
          const actionHandlers = handlers.get(action) ?? new Set<Handler>();
          actionHandlers.add(callback);
          handlers.set(action, actionHandlers);

          if (
            action === "linkReady" &&
            (["ready", "no-slots"].includes(initialMode) ||
              (initialMode === "failure" && !namespace.endsWith("-0")))
          ) {
            window.setTimeout(() => dispatch(namespace, action), 0);
          }
          if (
            action === "linkFailed" &&
            initialMode === "failure" &&
            namespace.endsWith("-0")
          ) {
            window.setTimeout(() => dispatch(namespace, action), 0);
          }
        }

        if (command === "off") {
          const action = String(payload.action ?? "");
          const callback = payload.callback as Handler | undefined;
          if (callback) handlers.get(action)?.delete(callback);
        }
      }) as MockApi;
      api.handlers = handlers;
      return api;
    }

    const cal = ((command: string, namespace?: string) => {
      if (command !== "init" || typeof namespace !== "string") return;
      namespaces[namespace] ??= createApi(namespace);
      cal.ns[namespace] = namespaces[namespace];
    }) as ((command: string, namespace?: string) => void) & {
      loaded: boolean;
      ns: Record<string, MockApi>;
    };
    cal.loaded = true;
    cal.ns = {};

    Object.defineProperty(window, "Cal", {
      configurable: true,
      writable: true,
      value: cal,
    });
    window.__calMock = {
      calls,
      emit(action, data = {}, namespace) {
        const targets = namespace ? [namespace] : Object.keys(namespaces);
        for (const target of targets) dispatch(target, action, data);
      },
    };
  }, mode);
}

export async function calCalls(page: Page, command?: string) {
  return page.evaluate(
    (expectedCommand) =>
      window.__calMock.calls.filter(
        (call) => !expectedCommand || call.command === expectedCommand,
      ),
    command,
  );
}

export async function waitForCalCall(
  page: Page,
  command: string,
  afterCount = 0,
) {
  await page.waitForFunction(
    ({ expectedCommand, previousCount }) =>
      window.__calMock.calls.filter(
        (call) => call.command === expectedCommand,
      ).length > previousCount,
    { expectedCommand: command, previousCount: afterCount },
    { timeout: 5_000 },
  );
  return (await calCalls(page, command)).at(-1);
}
