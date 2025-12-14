# Ngarembug Monolith API Documentation

Base URL: `/api/v1`

## 1. Cafes API
Get a list of cafes with optional filtering, sorting, and pagination.

**Endpoint:** `GET /cafes`

### Query Parameters
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Page number (default: 1) | `1` |
| `limit` | `number` | Items per page (default: 10, max: 100) | `10` |
| `search` | `string` | Search by name or description (generic search) | `kopi` |
| `id` | `string` | precise ID match | `cm...` |
| `slug` | `string` | precise slug match | `kopi-tuku` |
| `region` | `string` | Filter by region alias or value (comma separated for multiple) | `bandung,jakarta` |
| `types` | `string` | Filter by cafe type alias or value | `indoor,outdoor` |
| `priceRange` | `string` | Filter by price range alias | `$,$$` |
| `minPrice` | `number` | Minimum price per person | `10000` |
| `maxPrice` | `number` | Maximum price per person | `50000` |
| `minReviews` | `number` | Minimum number of reviews | `10` |
| `minAvgRating`| `number` | Minimum average rating (0-5) | `4.5` |
| `orderBy` | `string` | Sort field: `price`, `rating`, `reviews`, `distance`, `capacity`, `created_at`, `updated_at` | `rating` |
| `orderDir` | `string` | Sort direction: `asc`, `desc` | `desc` |

### Example Request
```bash
curl "http://localhost:3000/api/v1/cafes?region=bandung&types=indoor&minAvgRating=4.5"
```

---

## 2. Facilities API
Get a list of available facilities.

**Endpoint:** `GET /facilities`

### Query Parameters
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Page number (default: 1) | `1` |
| `limit` | `number` | Items per page (default: 10, max: 100) | `20` |
| `keyword` | `string` | Search by name or description | `wifi` |
| `id` | `string` | Precise ID match | `cl...` |
| `slug` | `string` | Precise slug match | `wifi-id` |
| `orderBy` | `string` | Sort field: `name`, `created_at`, `updated_at` | `name` |
| `orderDir` | `string` | Sort direction: `asc`, `desc` | `asc` |

### Example Request
```bash
curl "http://localhost:3000/api/v1/facilities?keyword=parking"
```

---

## 3. Terms API
Get a list of terms (rules/regulations).

**Endpoint:** `GET /terms`

### Query Parameters
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Page number (default: 1) | `1` |
| `limit` | `number` | Items per page (default: 10, max: 100) | `10` |
| `keyword` | `string` | Search by name or description | `smoking` |
| `id` | `string` | Precise ID match | `ct...` |
| `slug` | `string` | Precise slug match | `no-smoking` |
| `orderBy` | `string` | Sort field: `name`, `created_at`, `updated_at` | `name` |
| `orderDir` | `string` | Sort direction: `asc`, `desc` | `asc` |

### Example Request
```bash
curl "http://localhost:3000/api/v1/terms?keyword=pet"
```
