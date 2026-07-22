"use client";

import { useMemo, useState } from "react";
import styles from "./CostCalculator.module.css";

const rate = 8;
const hw = 42000;
const opex = 700;
const months = 24;
const X0 = 70,
  X1 = 730,
  Y0 = 320,
  Y1 = 40;

function fmt(v: number) {
  if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `$${Math.round(v / 1000)}k`;
  return `$${Math.round(v)}`;
}

export function CostCalculator() {
  const [volume, setVolume] = useState(800);

  const data = useMemo(() => {
    const cloud: number[] = [];
    const local: number[] = [];
    for (let m = 0; m <= months; m++) {
      cloud.push(m * volume * rate);
      local.push(hw + m * opex);
    }
    const maxVal = Math.max(cloud[months], local[months]) * 1.08;
    const px = (m: number) => X0 + (m / months) * (X1 - X0);
    const py = (v: number) => Y0 - (v / maxVal) * (Y0 - Y1);
    const toPts = (arr: number[]) =>
      arr.map((v, m) => `${px(m).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

    let beMonth: number | null = null;
    for (let m = 1; m <= months; m++) {
      if (cloud[m] >= local[m]) {
        beMonth = m;
        break;
      }
    }
    const saved = cloud[months] - local[months];
    return {
      cloudPoints: toPts(cloud),
      localPoints: toPts(local),
      cloudTotal: fmt(cloud[months]),
      localTotal: fmt(local[months]),
      verdictLabel:
        saved > 0
          ? "Saved over 24 months"
          : "Cloud stays cheaper at this volume",
      verdictValue: fmt(Math.abs(saved)),
      beMonth,
      beX: beMonth ? px(beMonth).toFixed(1) : "0",
      beY: beMonth ? py(local[beMonth]).toFixed(1) : "0",
      maxLabel: fmt(maxVal),
      midLabel: fmt(maxVal / 2),
      volumeLabel: `${volume >= 1000 ? (volume / 1000).toFixed(1) + "B" : volume + "M"} tokens / mo`,
    };
  }, [volume]);

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <label>
          Monthly token volume
          <input
            type="range"
            min={100}
            max={3000}
            step={50}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </label>
        <div className={styles.vol}>{data.volumeLabel}</div>
        <div className={styles.assumptions}>
          Cloud ${rate}/M tokens · Hardware {fmt(hw)} + ${opex}/mo
        </div>
        <div className={styles.verdict}>
          <span>{data.verdictLabel}</span>
          <strong>{data.verdictValue}</strong>
        </div>
        <div className={styles.totals}>
          <div>
            <span>Cloud 24mo</span>
            <b>{data.cloudTotal}</b>
          </div>
          <div>
            <span>Local 24mo</span>
            <b>{data.localTotal}</b>
          </div>
        </div>
      </div>
      <svg
        className={styles.chart}
        viewBox="0 0 800 360"
        role="img"
        aria-label="Cost comparison chart"
      >
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#3A4A6B" />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} stroke="#3A4A6B" />
        <text
          x={X0 - 8}
          y={Y0 + 4}
          textAnchor="end"
          fill="#B8C4D9"
          fontSize="11"
        >
          $0
        </text>
        <text
          x={X0 - 8}
          y={(Y0 + Y1) / 2}
          textAnchor="end"
          fill="#B8C4D9"
          fontSize="11"
        >
          {data.midLabel}
        </text>
        <text
          x={X0 - 8}
          y={Y1 + 4}
          textAnchor="end"
          fill="#B8C4D9"
          fontSize="11"
        >
          {data.maxLabel}
        </text>
        <polyline
          fill="none"
          stroke="#F37779"
          strokeWidth="2.5"
          points={data.cloudPoints}
        />
        <polyline
          fill="none"
          stroke="#73C1AE"
          strokeWidth="2.5"
          points={data.localPoints}
        />
        {data.beMonth && (
          <circle cx={data.beX} cy={data.beY} r="5" fill="#FFF860" />
        )}
        <text x={X1} y={Y0 + 20} textAnchor="end" fill="#B8C4D9" fontSize="11">
          24 mo
        </text>
      </svg>
    </div>
  );
}
