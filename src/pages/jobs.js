import React from "react";
import Link from "gatsby-link";
import { Helmet } from "react-helmet";
import ta from "time-ago";
import { graphql } from "gatsby";
import Nav from "../components/nav";
import styles from "./about.module.scss";
import Layout from "../components/layout";
import MapIcon from "../icons/map";
import Button from "../components/button";

const Jobs = props => {
  const emptyState =
    props.data.allSeeker.edges[0].node.job.job_title === "Empty";
  return (
    <Layout>
      <Helmet
        title="Jobs | Women Who Design"
        meta={[
          {
            property: "description",
            content: "Jobs for talented women designers."
          },
          { property: "og:title", content: "Women Who Design Jobs" },
          {
            property: "og:description",
            content: "Jobs for talented women designers."
          },
          {
            property: "og:image",
            content: "https://womenwho.design/opengraph.png"
          },
          { property: "og:url", content: "https://womenwho.design/jobs" },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: "Women Who Design" },
          { property: "twitter:site", content: "@womenwhodesign" },
          { property: "twitter:creator", content: "@julesforrest" },
          { property: "twitter:card", content: "summary_large_image" },
          {
            property: "twitter:image",
            content: "https://womenwho.design/opengraph.png"
          }
        ]}
      />
      <Nav theme="light" />
      <div className={styles.container}>
        <h1 className={styles.h1}>Find a job</h1>

        {emptyState && (
          <div>
            <p className={styles.p}>
              {" "}
              Unfortunately, we don't have any jobs to share at the moment.
              Please check back soon!
            </p>
          </div>
        )}
        {!emptyState && (
          <>
            <p className={styles.p}>Jobs for talented women who design.</p>
            <div style={{ margin: "24px 0" }}>
              <Button
                href="https://womenwhodesign.seeker.company/submit/job"
                width="auto"
              >
                Post a job
              </Button>
            </div>
            <ul>
              {props.data.allSeeker.edges.map((job, index) => {
                const date = ta.ago(job.node.job.creation_date);
                return (
                  <li key={index}>
                    <Link to={job.node.fields.slug} className={styles.jobLink}>
                      <div className={styles.jobLinkInner}>
                        <h2 className={styles.h2}>
                          {job.node.job.company.name},{" "}
                          <span style={{ fontWeight: 400 }}>
                            {job.node.job.job_title}
                          </span>{" "}
                          <span className={styles.arrow}>→</span>
                        </h2>
                        <div className={styles.listingMetadataContainer}>
                          <p className={styles.listingMetadata}>
                            <span className="icon-group">
                              <MapIcon size={16} />
                              {job.node.job.job_location}
                            </span>
                          </p>
                          <p className={styles.jobDate}>{date}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <div className={styles.postAJob}>
          <p className={styles.h2}>Post a job</p>
          <p>
            This job board is powered by{" "}
            <a href="https://seeker.company">Seeker</a>. If you&apos;re
            interested in supporting this project, please consider posting a
            job.
          </p>
          <Button
            href="https://womenwhodesign.seeker.company/submit/job"
            width="auto"
          >
            Post a job
          </Button>
        </div>
        <div className={styles.backContainer}>
          <Link to="/" className={styles.backLink}>
            Back to directory
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;

export const pageQuery = graphql`
  query Jobs {
    allSeeker(sort: { fields: job___creation_date, order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          job {
            job_title
            job_link
            job_application_link
            job_description
            job_location
            creation_date
            company {
              name
              company_url
            }
          }
        }
      }
    }
  }
`;
