# Proactive Monitoring

Proactive monitoring will monitor job jobs as they run and actively create alerts when certain thresholds (see tables below) are breached.

## Job

Similarly, the Job events being monitored are:

| Alert Code | Event Description                              |
| ---------- | ---------------------------------------------- |
| P01        | Job has failed.                                |
| P02        | Job has taken less time than usual to run.     |
| P03        | Job has taken more time than usual to run.     |
| P04        | Job has not completed as per business SLA.     |
| P05        | Job is currently running longer than expected. |

## Artefact

Finally, the Artefact events being monitored are:

| Alert Code | Event Description                                   |
| ---------- | --------------------------------------------------- |
| A01        | Source artefact has zero rows.                      |
| A02        | Target artefact loaded zero rows.                   |
| A03        | Target artefact has rejected rows.                  |
| A04        | Artefact loaded fewer rows than the recent average. |
| A05        | Artefact loaded more rows than the recent average.  |
