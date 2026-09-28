"use client";

import { motion } from "motion/react";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import { fadeUp, viewport } from "../lib/motion";
import { Cell, COMPARISON, PLANS } from "@/lib/plans";


function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <IconCheck size={18} className="mx-auto text-palm-600" aria-hidden />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <IconMinus size={18} className="mx-auto text-ink/25" aria-hidden />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[13.5px] font-medium">{value}</span>;
}

export function PlanComparison() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="mt-20 sm:mt-28"
    >
      <div className="mx-auto mb-8 max-w-[560px] text-center">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Compare every plan</h2>
        <p className="mt-2 text-[14.5px] text-ink-soft">Exactly what you get, and where each limit sits.</p>
      </div>

      {/* Scrolls sideways on small screens rather than cramming three columns */}
      <div className="overflow-x-auto rounded-2xl border border-sand-300">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-sand-300 bg-sand-100">
              <th scope="col" className="w-[40%] px-4 py-4 text-[13px] font-semibold text-ink-soft sm:px-5">
                <span className="sr-only">Feature</span>
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={`px-3 py-4 text-center font-display text-base font-bold ${
                    p.featured ? "bg-indigo-50 text-indigo-600" : ""
                  }`}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          {COMPARISON.map((group) => (
            <tbody key={group.group}>
              <tr>
                <th
                  colSpan={4}
                  scope="colgroup"
                  className="bg-paper-dim px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-widest text-ink-soft sm:px-5"
                >
                  {group.group}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label} className="border-t border-sand-200">
                  <th scope="row" className="px-4 py-3 text-[14px] font-normal sm:px-5">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={PLANS[i].id}
                      className={`px-3 py-3 text-center ${PLANS[i].featured ? "bg-indigo-50/50" : ""}`}
                    >
                      <CellValue value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </motion.div>
  );
}