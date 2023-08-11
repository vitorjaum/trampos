import styles from "../styles/page.module.css";
import { Header } from "@/components/Header";

type dataProps = {
  opportunity: {
    name: string;
    company_name: string;
    permalink: string;
    published_at: string;
  };
};

async function getData() {
  const res = await fetch("http://trampos.co/api/oportunidades.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = res.json();
  return data;
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section>
          {data.map((item: dataProps, idx: number) => {
            return (
              <div key={idx}>
                <h2>
                  <a target="_blank" href={item.opportunity.permalink}>
                    {item.opportunity.name}
                  </a>
                </h2>
                <div>
                  <p>company: {item.opportunity.company_name}</p>
                  <p>published at: {item.opportunity.published_at}</p>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
