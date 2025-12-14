# Ngarembug Monolith API Documentation

Base URL: `/api/v1`

## Authentication
All API endpoints are protected by Bearer Token authentication.
**Header:** `Authorization: Bearer <YOUR_API_TOKEN>`

## 1. Cafes API
**Endpoint:** `/cafes`

### GET /cafes
Get a list of cafes with optional filtering, sorting, and pagination.

#### Query Parameters
| Parameter | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `page` | `number` | Page number (default: 1) | `1` |
| `limit` | `number` | Items per page (default: 10, max: 100) | `10` |
| `search` | `string` | Search by name or description (generic search) | `kopi` |
| `id` | `string` | precise ID match | `cm...` |
| `slug` | `string` | precise slug match | `kopi-tuku` |
| `region` | `string` | Filter by region alias or value | `bandung` |
| `types` | `string` | Filter by cafe type alias or value | `indoor` |
| `priceRange` | `string` | Filter by price range alias | `$,$$` |
| `minAvgRating`| `number` | Minimum average rating (0-5) | `4.5` |
| `orderBy` | `string` | Sort field: `price`, `rating`, `reviews`, `distance`, `capacity`, `created_at` | `rating` |
| `orderDir` | `string` | Sort direction: `asc`, `desc` | `desc` |

---

## 2. Facilities API
**Endpoint:** `/facilities`

### GET /facilities
Get a list of available facilities.

#### Query Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page`, `limit` | `number` | Pagination |
| `keyword` | `string` | Search name/description |

### POST /facilities
Create a new facility.

#### Body
```json
{
  "name": "Free WiFi",
  "slug": "free-wifi",
  "description": "High speed internet"
}
```

### PUT /facilities/:id
Update a facility.

#### Body
```json
{
  "name": "Ultra Fast WiFi"
}
```

### DELETE /facilities/:id
Delete a facility.

---

## 3. Terms API
**Endpoint:** `/terms`

### GET /terms
Get a list of terms.

#### Query Parameters
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `page`, `limit` | `number` | Pagination |
| `keyword` | `string` | Search name/description |

### POST /terms
Create a new term.

#### Body
```json
{
  "name": "No Smoking",
  "slug": "no-smoking",
  "description": "Smoking is prohibited"
}
```

### PUT /terms/:id
Update a term.

#### Body
```json
{
  "description": "Smoking area available outside"
}
```

### DELETE /terms/:id
Delete a term.
