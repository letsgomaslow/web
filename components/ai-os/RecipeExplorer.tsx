"use client";

import { useState } from "react";
import { toolBrands, workflowRecipes } from "@/lib/content/ai-os-home";
import { ToolMark } from "./ToolMark";
import styles from "./AIOSHome.module.css";

type RecipeKey = keyof typeof workflowRecipes;
const keys = Object.keys(workflowRecipes) as RecipeKey[];

export function RecipeExplorer() {
  const [selected, setSelected] = useState<RecipeKey>("knowledge");
  const recipe = workflowRecipes[selected];
  const select = (key: RecipeKey, focus = false) => {
    setSelected(key);
    if (focus)
      document.getElementById(`recipe-${key}`)?.focus({ preventScroll: true });
  };
  const onKey = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: number | undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % keys.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + keys.length) % keys.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = keys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    select(keys[next], true);
  };

  return (
    <div className={styles.recipeLayout}>
      <div
        className={styles.recipeSelector}
        role="tablist"
        aria-label="Explore a starting workflow"
        aria-orientation="vertical"
      >
        {keys.map((key, index) => (
          <button
            key={key}
            id={`recipe-${key}`}
            type="button"
            role="tab"
            aria-selected={selected === key}
            aria-controls="recipe-panel"
            tabIndex={selected === key ? 0 : -1}
            onClick={() => select(key)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <span>{workflowRecipes[key].number}</span>
            <span>
              <strong>{workflowRecipes[key].title}</strong>
              <small>{workflowRecipes[key].note}</small>
            </span>
            <b aria-hidden="true">↗</b>
          </button>
        ))}
      </div>
      <div
        className={styles.recipePanel}
        id="recipe-panel"
        role="tabpanel"
        aria-labelledby={`recipe-${selected}`}
        tabIndex={0}
        data-tone={recipe.tone}
      >
        <div className={styles.recipeSheet} aria-live="polite">
          <div>
            <span>WORKFLOW SKETCH / {recipe.number}</span>
            <span>ILLUSTRATIVE</span>
          </div>
          <p>{recipe.question}</p>
          <dl>
            <dt>START WITH</dt>
            <dd>{recipe.input}</dd>
            <dt>WORK TOWARD</dt>
            <dd>
              <strong>{recipe.outcome}</strong>
            </dd>
          </dl>
        </div>
        <div className={styles.recipeBuild}>
          <p>EXAMPLE TOOL CHOICES</p>
          {recipe.tools.map(([key, role]) => (
            <a
              key={`${selected}-${key}`}
              href={toolBrands[key].href}
              className={styles.recipeTool}
            >
              <span>
                {toolBrands[key].logo ? (
                  <ToolMark tool={key} size={25} />
                ) : null}
              </span>
              <span>
                <strong>{toolBrands[key].name}</strong>
                <small>{role}</small>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
          <div className={styles.recipeMaslow}>
            <span>MASLOW’S PART</span>
            <p>{recipe.service}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
