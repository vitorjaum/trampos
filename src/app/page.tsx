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
            const day = item.opportunity.published_at.slice(8, 10);
            const month = item.opportunity.published_at.slice(5, 7);
            const year = item.opportunity.published_at.slice(0, 4);

            return (
              <div key={idx}>
                <h2>
                  <a target="_blank" href={item.opportunity.permalink}>
                    {item.opportunity.name}
                  </a>
                </h2>
                <div>
                  <p>company: {item.opportunity.company_name}</p>
                  <p>published at: {`${day}/${month}/${year}`}</p>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
