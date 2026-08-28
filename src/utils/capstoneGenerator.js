// Preset templates for infinite real-world Python engineering capstone projects
const capstoneTemplates = [
  {
    title: 'Capstone: JWT Token Payload Extractor',
    taskName: 'Authentication Systems',
    icon: '🔑',
    concept: 'JWT & Base64 Decoding',
    description: 'Simulate extracting payload from a JWT token (header.payload.signature). Decode base64 json payload string and print the user ID.',
    starterCode: `import base64
import json

# Simulated payload base64 for {"sub": "user_4982", "role": "admin"}
raw_b64 = "eyJzdWIiOiAidXNlcl80OTgyIiwgInJvbGUiOiAiYWRtaW4ifQ=="
payload_json = base64.b64decode(raw_b64).decode("utf-8")
data = json.loads(payload_json)

print(f"User: {data['sub']}, Role: {data['role']}")`,
    expectedOutput: 'User: user_4982, Role: admin',
    hint: 'Use base64.b64decode and json.loads to parse JWT payload.'
  },
  {
    title: 'Capstone: Redis In-Memory Key-Value Store with TTL',
    taskName: 'Cache Architecture',
    icon: '⚡',
    concept: 'Key-Value & Expiration',
    description: 'Implement a MiniRedis store class with set(k, v) and get(k). Store session tokens and print retrieved active token.',
    starterCode: `class MiniRedis:
    def __init__(self):
        self.store = {}
        
    def set(self, key, value):
        self.store[key] = value
        
    def get(self, key):
        return self.store.get(key, None)

db = MiniRedis()
db.set("session_token", "sec_98472910")
print(f"Token: {db.get('session_token')}")`,
    expectedOutput: 'Token: sec_98472910',
    hint: 'Store key-value pairs in internal dictionary.'
  },
  {
    title: 'Capstone: Trie Prefix Search Autocomplete',
    taskName: 'Search Engine Algorithms',
    icon: '🌲',
    concept: 'Trie Data Structure',
    description: 'Implement Trie prefix searching: find all stored words starting with prefix "py" from ["python", "pytorch", "pyspark", "rust"].',
    starterCode: `words = ["python", "pytorch", "pyspark", "rust", "golang"]
prefix = "py"

matches = [w for w in words if w.startswith(prefix)]
print(sorted(matches))`,
    expectedOutput: "['pyspark', 'python', 'pytorch']",
    hint: 'Filter words with str.startswith(prefix).'
  },
  {
    title: 'Capstone: Blockchain Hash Block Validator',
    taskName: 'Cryptographic Ledgers',
    icon: '⛓️',
    concept: 'SHA-256 Hashing',
    description: 'Calculate SHA-256 hash of a blockchain transaction block {"prev": "0000", "data": "Alice->Bob 50 BTC"} using hashlib.',
    starterCode: `import hashlib

block_data = "prev:0000;tx:Alice->Bob:50"
block_hash = hashlib.sha256(block_data.encode("utf-8")).hexdigest()
print(f"Hash prefix: {block_hash[:8]}")`,
    expectedOutput: 'Hash prefix: cfa27e46',
    hint: 'Use hashlib.sha256(data.encode()).hexdigest().'
  },
  {
    title: 'Capstone: Microservice Circuit Breaker',
    taskName: 'Resilience Engineering',
    icon: '🔌',
    concept: 'Circuit Breaker Pattern',
    description: 'Implement a CircuitBreaker that trips to "OPEN" after 3 consecutive failures. Simulate 4 failures and print final state.',
    starterCode: `class CircuitBreaker:
    def __init__(self, threshold=3):
        self.failures = 0
        self.threshold = threshold
        self.state = "CLOSED"
        
    def record_failure(self):
        self.failures += 1
        if self.failures >= self.threshold:
            self.state = "OPEN"

cb = CircuitBreaker(3)
for _ in range(4):
    cb.record_failure()

print(f"Circuit State: {cb.state}")`,
    expectedOutput: 'Circuit State: OPEN',
    hint: 'Transition state to OPEN when failures >= threshold.'
  },
  {
    title: 'Capstone: Distributed ID Snowflake Generator',
    taskName: 'Distributed Systems',
    icon: '❄️',
    concept: 'High-Concurrency IDs',
    description: 'Generate formatted distributed 64-bit ID string incorporating node_id and sequence: f"{node_id}-{seq:04d}".',
    starterCode: `node_id = 7
seq = 42
distributed_id = f"node{node_id}-{seq:04d}"
print(distributed_id)`,
    expectedOutput: 'node7-0042',
    hint: 'Format sequence with leading zeroes using :04d.'
  },
  {
    title: 'Capstone: CSV Stream Data Pipeline to JSON',
    taskName: 'Data Pipeline Engineering',
    icon: '🚰',
    concept: 'Streaming & Transformation',
    description: 'Transform streamed CSV lines "id,name,role" into structured JSON records. Output count of transformed records.',
    starterCode: `csv_lines = [
    "1,Alice,Engineer",
    "2,Bob,Product",
    "3,Charlie,Security"
]

records = []
for line in csv_lines:
    uid, name, role = line.split(",")
    records.append({"id": int(uid), "name": name, "role": role})

print(f"Processed: {len(records)} records")`,
    expectedOutput: 'Processed: 3 records',
    hint: 'Split by comma and parse fields.'
  },
  {
    title: 'Capstone: Dynamic SQL Query Builder',
    taskName: 'ORM & Query Engines',
    icon: '🛠️',
    concept: 'SQL Query Synthesis',
    description: 'Build parameterized SELECT query with WHERE conditions from dictionary {"status": "active", "tier": "gold"}.',
    starterCode: `table = "users"
filters = {"status": "active", "tier": "gold"}

clauses = [f"{k} = '{v}'" for k, v in sorted(filters.items())]
sql = f"SELECT * FROM {table} WHERE " + " AND ".join(clauses)
print(sql)`,
    expectedOutput: "SELECT * FROM users WHERE status = 'active' AND tier = 'gold'",
    hint: 'Sort filter keys and join with AND.'
  }
];

export function generateNextCapstoneQuest(existingCount) {
  const capstoneIndex = existingCount - 100;
  const template = capstoneTemplates[capstoneIndex % capstoneTemplates.length];
  const iteration = Math.floor(capstoneIndex / capstoneTemplates.length) + 1;
  const newId = existingCount + 1;

  return {
    id: newId,
    title: iteration > 1 ? `${template.title} [Mk ${iteration}]` : template.title,
    taskName: template.taskName,
    icon: template.icon || '🌌',
    world: 'Realm 11: Capstone Matrix',
    concept: template.concept,
    isCapstone: true,
    description: template.description,
    starterCode: template.starterCode,
    expectedOutput: template.expectedOutput,
    hint: template.hint,
    xp: 1000 + (newId - 100) * 100
  };
}
