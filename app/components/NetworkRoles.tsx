"use client";

import { useEffect, useRef, useState } from "react";

export type Role = {
  title: string;
  label: string;
  description: string;
  /** One-line summary of the role's access, taken from the description. */
  access: string;
};

const roleId = (i: number) => `role-${i + 1}`;

/**
 * "How members participate": a sticky heading with an index of the four roles beside an
 * editorial list of them. The index follows the scroll position and jumps to a role on click.
 */
export function NetworkRoles({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  // Mark the role crossing the upper-middle of the viewport as active.
  useEffect(() => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLElement));
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="membership" className="nr-section" aria-labelledby="membership-title">
      <div className="nr-shell">
        <div className="nr-side">
          <div className="nr-heading reveal">
            <p className="nr-eyebrow">Membership</p>
            <h2 id="membership-title">How members <em>participate</em>.</h2>
            <p>Four membership categories define how organizations contribute to, govern, and engage with the Network.</p>
          </div>

          <nav className="nr-index reveal" aria-label="Membership categories">
            <ol>
              {roles.map((role, i) => (
                <li key={role.title}>
                  <a href={`#${roleId(i)}`} className={active === i ? "is-active" : undefined}
                    aria-current={active === i ? "true" : undefined}>
                    <span className="nr-index-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nr-index-title">{role.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <ol className="nr-list" ref={listRef}>
          {roles.map((role, i) => (
            <li key={role.title} id={roleId(i)} className={`nr-role reveal${active === i ? " is-active" : ""}`}>
              <span className="nr-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="nr-body">
                <p className="nr-label">{role.label}</p>
                <h3>{role.title}</h3>
                <p className="nr-desc">{role.description}</p>
                <p className="nr-access"><span aria-hidden="true" />{role.access}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default NetworkRoles;
