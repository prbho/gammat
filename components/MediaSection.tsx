import FadeUp from "./FadeUp";
import styles from "./MediaSection.module.css";

const channels = [
  {
    icon: "💼",
    title: "LinkedIn Executive Campaigns",
    desc: "Targeted outreach to Africa's C-suite across aviation, maritime, and infrastructure sectors.",
  },
  {
    icon: "📰",
    title: "Business & Industry Media",
    desc: "Coverage in leading pan-African and international trade publications and broadcast networks.",
  },
  {
    icon: "📣",
    title: "Corporate Visibility & Press",
    desc: "Branded press releases, executive profiles, and summit coverage distributed to 50+ media outlets.",
  },
];

export default function MediaSection() {
  return (
    <section id="media" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <FadeUp>
            <p className={styles.label}>Visibility</p>
            <h2 className={styles.title}>
              Media &amp;
              <br />
              <span className={styles.accent}>Publicity</span>
            </h2>
          </FadeUp>
          <FadeUp delay={1}>
            <p className={styles.desc}>
              Unmatched amplification across Africa&apos;s leading business and
              trade media networks, executive LinkedIn campaigns, and broadcast
              press coverage reaching the continent&apos;s decision-makers.
            </p>
          </FadeUp>
        </div>

        <div className={styles.grid}>
          {channels.map((c, i) => (
            <FadeUp key={c.title} delay={(i + 1) as 1 | 2 | 3}>
              <div className={styles.item}>
                <span className={styles.icon}>{c.icon}</span>
                <h3 className={styles.itemTitle}>{c.title}</h3>
                <p className={styles.itemDesc}>{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
