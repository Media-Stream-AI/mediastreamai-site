# Beta Signup Data

## ⭐ BACKEND TEAM — EMAIL LIST LOCATION

Beta signup submissions are saved to:

```
data/beta-signups.csv
```

This CSV is generated automatically when the first signup is submitted.

### Columns
| Column | Description |
|--------|-------------|
| `timestamp` | ISO 8601 timestamp of signup |
| `name` | Signee's full name |
| `work_email` | Signee's work email address |
| `source` | Where they signed up from (e.g. `msai-site-countdown-overlay`) |

### Downloading the CSV via API

```
GET /api/beta-signup?secret=<BETA_CSV_SECRET>
```

Set `BETA_CSV_SECRET` in your `.env` file to secure this endpoint.
If `BETA_CSV_SECRET` is not set, the endpoint is publicly accessible — **set it in production**.

### Example .env entry
```
BETA_CSV_SECRET=your-secure-random-secret-here
```
