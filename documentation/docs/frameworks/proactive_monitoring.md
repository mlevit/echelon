# Proactive Monitoring

Proactive monitoring will monitor process jobs as they run and actively create alerts when certain thresholds (see tables below) are breached.

## Process

Similarly, the Process events being monitored are:

| Alert Code | Event Description                                  |
| ---------- | -------------------------------------------------- |
| P01        | Process has failed.                                |
| P02        | Process has taken less time than usual to run.     |
| P03        | Process has taken more time than usual to run.     |
| P04        | Process has not completed as per business SLA.     |
| P05        | Process is currently running longer than expected. |

## Artefact

Finally, the Artefact events being monitored are:

| Alert Code | Event Description                                   |
| ---------- | --------------------------------------------------- |
| A01        | Source artefact has zero rows.                      |
| A02        | Target artefact loaded zero rows.                   |
| A03        | Target artefact has rejected rows.                  |
| A04        | Artefact loaded fewer rows than the recent average. |
| A05        | Artefact loaded more rows than the recent average.  |
