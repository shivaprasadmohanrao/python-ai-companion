import { 
  Code, Terminal, Zap, Globe, Cpu, Package, BookOpen, 
  Brain, Mic, Shield, Layers, GitBranch, Puzzle, FlaskConical,
  type LucideIcon 
} from "lucide-react";

export interface Section {
  title: string;
  content: string;
  code?: string;
  tip?: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tier: string;
  sections: Section[];
  tags: string[];
  quiz?: QuizItem[];
}

export interface QuizItem {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const guides: Guide[] = [
  {
    id: "python-basics",
    title: "Python Fundamentals",
    description: "Variables, data types, control flow, functions, and core syntax you need every day",
    icon: Code,
    tier: "Beginner",
    tags: ["Variables", "Functions", "Loops", "Data Types"],
    sections: [
      {
        title: "Variables & Data Types",
        content: "Python is dynamically typed — no need to declare types. Think of variables as **name tags** on objects, not boxes.",
        code: `# Numbers
age = 25              # int
price = 19.99         # float
is_active = True      # bool

# Strings
name = "Python"
multiline = """This spans
multiple lines"""

# Collections
fruits = ["apple", "banana", "cherry"]   # list (mutable)
coords = (10.0, 20.0)                    # tuple (immutable)
unique = {1, 2, 3}                       # set (no duplicates)
person = {"name": "Ada", "age": 30}      # dict (key-value)

# Type checking
print(type(age))       # <class 'int'>
print(isinstance(name, str))  # True`,
        tip: "🧠 Memory trick: Lists use [square] brackets because they're 'flexible' like a spring. Tuples use (round) parentheses because they're 'locked' like a ball."
      },
      {
        title: "Control Flow",
        content: "Python uses **indentation** (not braces) to define blocks. This forces clean, readable code.",
        code: `# If/elif/else
temperature = 72
if temperature > 85:
    print("It's hot! 🔥")
elif temperature > 65:
    print("Nice weather! ☀️")
else:
    print("Bundle up! 🧥")

# For loops
for fruit in ["apple", "banana", "cherry"]:
    print(f"I love {fruit}")

# List comprehension (Pythonic!)
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# While loop with break
count = 0
while True:
    if count >= 5:
        break
    print(f"Count: {count}")
    count += 1

# Walrus operator (:=) — assign and test
if (n := len("hello")) > 3:
    print(f"Length {n} is greater than 3")`,
        tip: "🧠 Think of 'for x in collection' as: 'for each x that's in the collection, do this...'"
      },
      {
        title: "Functions & Arguments",
        content: "Functions are first-class citizens. They can be passed around, returned, and stored in variables.",
        code: `# Basic function
def greet(name: str, excited: bool = False) -> str:
    """Greet someone. Docstrings explain what functions do."""
    if excited:
        return f"HEY {name.upper()}!!! 🎉"
    return f"Hello, {name}"

print(greet("Alice"))              # Hello, Alice
print(greet("Bob", excited=True))  # HEY BOB!!! 🎉

# *args and **kwargs
def flexible(*args, **kwargs):
    print(f"Positional: {args}")    # tuple
    print(f"Keyword: {kwargs}")     # dict

flexible(1, 2, 3, name="Python", version=3.12)

# Lambda (anonymous functions)
double = lambda x: x * 2
print(double(5))  # 10

# Functions as arguments
numbers = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(numbers, key=lambda x: -x)
# [9, 5, 4, 3, 1, 1]

# Decorators — functions that wrap functions
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time()-start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "Done!"`,
        tip: "🧠 A decorator is like a gift wrapper — it takes your function, adds something extra, and gives it back with the same name."
      },
      {
        title: "String Formatting & f-strings",
        content: "f-strings (formatted string literals) are the modern, fast, and readable way to build strings.",
        code: `name = "World"
version = 3.12

# f-strings (Python 3.6+)
print(f"Hello, {name}!")
print(f"Python {version:.1f}")
print(f"{'centered':^20}")    # '      centered      '
print(f"{42:08b}")             # '00101010' (binary)
print(f"{1000000:,}")          # '1,000,000'

# Multiline f-strings
user = {"name": "Ada", "role": "Engineer"}
msg = f"""
Welcome back, {user['name']}!
Your role: {user['role']}
Access level: {'Admin' if user['role'] == 'Engineer' else 'Basic'}
"""

# Debug with f-string (Python 3.8+)
x = 42
print(f"{x = }")  # x = 42  (shows variable name!)`,
        tip: "🧠 f-strings are like mad-libs — the curly braces {} are the blanks you fill in with Python expressions."
      }
    ],
    quiz: [
      {
        question: "What is the output of: type([1, 2, 3])?",
        options: ["<class 'tuple'>", "<class 'list'>", "<class 'array'>", "<class 'set'>"],
        answer: 1,
        explanation: "Square brackets [] create a list in Python."
      },
      {
        question: "Which is immutable?",
        options: ["list", "dict", "set", "tuple"],
        answer: 3,
        explanation: "Tuples are immutable — once created, they can't be changed. That's why they use () 'locked' parentheses."
      },
      {
        question: "What does *args capture?",
        options: ["Keyword arguments as dict", "Positional arguments as tuple", "A single argument", "Named arguments only"],
        answer: 1,
        explanation: "*args collects extra positional arguments into a tuple. **kwargs collects keyword arguments into a dict."
      }
    ]
  },
  {
    id: "oop-classes",
    title: "OOP: Classes & Objects",
    description: "When to create classes, inheritance, magic methods, and exception handling patterns",
    icon: Layers,
    tier: "Beginner → Intermediate",
    tags: ["Classes", "Objects", "Inheritance", "Exceptions"],
    sections: [
      {
        title: "When & Why to Use Classes",
        content: "Use a class when you have **data + behavior** that belong together. If you're just grouping functions, a module is enough.",
        code: `# ❌ Without classes — scattered data
user_name = "Alice"
user_email = "alice@example.com"
def send_email(name, email, msg):
    print(f"Sending '{msg}' to {name} <{email}>")

# ✅ With a class — data + behavior together
class User:
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
    
    def send_email(self, message: str):
        print(f"Sending '{message}' to {self.name} <{self.email}>")
    
    def __repr__(self):
        return f"User(name='{self.name}', email='{self.email}')"

alice = User("Alice", "alice@example.com")
alice.send_email("Welcome!")
print(alice)  # User(name='Alice', email='alice@example.com')`,
        tip: "🧠 Rule of thumb: If you're passing the same group of variables to many functions, they probably want to be a class."
      },
      {
        title: "Inheritance & Composition",
        content: "Inheritance = 'is-a' relationship. Composition = 'has-a' relationship. **Prefer composition** when possible.",
        code: `# Inheritance — Dog IS an Animal
class Animal:
    def __init__(self, name: str):
        self.name = name
    
    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    def speak(self) -> str:
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self) -> str:
        return f"{self.name} says Meow!"

# Composition — Car HAS an Engine
class Engine:
    def __init__(self, horsepower: int):
        self.horsepower = horsepower
    
    def start(self):
        return f"Engine ({self.horsepower}hp) started! 🚗"

class Car:
    def __init__(self, model: str, engine: Engine):
        self.model = model
        self.engine = engine  # composition!
    
    def start(self):
        return f"{self.model}: {self.engine.start()}"

tesla = Car("Model 3", Engine(283))
print(tesla.start())`,
        tip: "🧠 'Favor composition over inheritance' — it's more flexible. You can swap engines, but you can't un-inherit from a parent."
      },
      {
        title: "Exception Handling",
        content: "Exceptions are Python's way of saying 'something went wrong.' Handle them gracefully to build robust apps.",
        code: `# Basic try/except/finally
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Can't divide by zero! ⚠️")
        return None
    except TypeError as e:
        print(f"Wrong types: {e}")
        return None
    else:
        print("Division successful! ✅")
        return result
    finally:
        print("This ALWAYS runs (cleanup)")

# Custom exceptions
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Cannot withdraw \${amount}. Balance: \${balance}"
        )

class BankAccount:
    def __init__(self, balance: float = 0):
        self.balance = balance
    
    def withdraw(self, amount: float):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Using it
account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Short by: \${e.amount - e.balance}")`,
        tip: "🧠 Golden rule: Only catch exceptions you can actually handle. Let unexpected ones bubble up — they reveal bugs."
      },
      {
        title: "Dataclasses & Magic Methods",
        content: "Dataclasses eliminate boilerplate. Magic methods (dunder methods) let your objects work with Python operators.",
        code: `from dataclasses import dataclass, field
from typing import List

@dataclass
class Product:
    name: str
    price: float
    tags: List[str] = field(default_factory=list)
    
    # Magic methods
    def __post_init__(self):
        self.name = self.name.title()
    
    def __str__(self):
        return f"{self.name} - \${self.price:.2f}"
    
    def __lt__(self, other):
        return self.price < other.price
    
    def __add__(self, other):
        return self.price + other.price

laptop = Product("gaming laptop", 999.99, ["electronics"])
mouse = Product("wireless mouse", 29.99)

print(laptop)              # Gaming Laptop - $999.99
print(laptop > mouse)      # True
print(laptop + mouse)      # 1029.98

# Sort products by price
products = [laptop, mouse, Product("keyboard", 79.99)]
for p in sorted(products):
    print(p)`,
        tip: "🧠 Dataclasses are like filling out a form — you define the fields, Python writes __init__, __repr__, __eq__ for you."
      }
    ],
    quiz: [
      {
        question: "When should you prefer composition over inheritance?",
        options: ["Always", "When the relationship is 'has-a'", "When the relationship is 'is-a'", "Never"],
        answer: 1,
        explanation: "Composition ('has-a') is more flexible. Use inheritance for true 'is-a' relationships."
      },
      {
        question: "What does the 'finally' block do?",
        options: ["Runs only on error", "Runs only on success", "Always runs", "Catches exceptions"],
        answer: 2,
        explanation: "finally always runs — whether there was an error or not. Perfect for cleanup like closing files."
      }
    ]
  },
  {
    id: "asyncio",
    title: "Async Programming",
    description: "asyncio, coroutines, tasks, event loops — write concurrent Python that flies",
    icon: Zap,
    tier: "Intermediate",
    tags: ["asyncio", "await", "Coroutines", "Concurrency"],
    sections: [
      {
        title: "Why Async? The Restaurant Analogy",
        content: "Imagine a restaurant with **one waiter**. Sync = waiter takes order, goes to kitchen, WAITS for food, then takes next order. Async = waiter takes order, goes to kitchen, immediately takes next order while food cooks!",
        code: `import asyncio
import time

# Synchronous — SLOW (waits for each one)
def sync_cook():
    print("Start cooking pasta...")
    time.sleep(2)  # blocks everything!
    print("Pasta done!")
    print("Start cooking steak...")
    time.sleep(3)
    print("Steak done!")
    # Total: 5 seconds

# Asynchronous — FAST (cooks in parallel)
async def async_cook():
    async def cook(dish, seconds):
        print(f"Start cooking {dish}...")
        await asyncio.sleep(seconds)  # non-blocking!
        print(f"{dish} done!")
    
    # Cook both at the same time
    await asyncio.gather(
        cook("pasta", 2),
        cook("steak", 3),
    )
    # Total: 3 seconds (the longest task)

# Run it
asyncio.run(async_cook())`,
        tip: "🧠 'await' = 'I'll wait here, but others can work while I wait.' It's polite concurrency!"
      },
      {
        title: "Core Patterns",
        content: "These are the async patterns you'll use 90% of the time.",
        code: `import asyncio
from typing import List

# Pattern 1: gather — run multiple coroutines concurrently
async def fetch_all_users():
    async def fetch_user(user_id: int) -> dict:
        await asyncio.sleep(0.5)  # simulates API call
        return {"id": user_id, "name": f"User_{user_id}"}
    
    users = await asyncio.gather(
        fetch_user(1),
        fetch_user(2),
        fetch_user(3),
    )
    return users  # All 3 fetched in ~0.5s, not 1.5s

# Pattern 2: Tasks — fire and forget (with control)
async def background_work():
    async def log_metrics():
        while True:
            print("📊 Logging metrics...")
            await asyncio.sleep(5)
    
    task = asyncio.create_task(log_metrics())
    
    # Do other work while metrics log in background
    await asyncio.sleep(12)
    task.cancel()  # stop when done

# Pattern 3: Semaphore — limit concurrency
async def rate_limited_fetch():
    semaphore = asyncio.Semaphore(3)  # max 3 at a time
    
    async def fetch_with_limit(url: str):
        async with semaphore:
            print(f"Fetching {url}")
            await asyncio.sleep(1)
            return f"Data from {url}"
    
    urls = [f"https://api.example.com/{i}" for i in range(10)]
    results = await asyncio.gather(
        *[fetch_with_limit(url) for url in urls]
    )
    return results

# Pattern 4: Queue — producer/consumer
async def pipeline():
    queue: asyncio.Queue = asyncio.Queue()
    
    async def producer():
        for i in range(5):
            await queue.put(f"item_{i}")
            await asyncio.sleep(0.1)
        await queue.put(None)  # signal done
    
    async def consumer():
        while True:
            item = await queue.get()
            if item is None:
                break
            print(f"Processing: {item}")
    
    await asyncio.gather(producer(), consumer())`,
        tip: "🧠 gather = 'everyone start at once.' Semaphore = 'only 3 at a time.' Queue = 'assembly line.'"
      },
      {
        title: "Async Context Managers & Iterators",
        content: "Use `async with` for resources that need cleanup, and `async for` for streaming data.",
        code: `import asyncio

# Async context manager
class AsyncDBConnection:
    async def __aenter__(self):
        print("🔌 Connecting to database...")
        await asyncio.sleep(0.5)
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("🔌 Closing connection...")
        await asyncio.sleep(0.1)
    
    async def query(self, sql: str):
        await asyncio.sleep(0.2)
        return [{"id": 1, "name": "Alice"}]

async def main():
    async with AsyncDBConnection() as db:
        results = await db.query("SELECT * FROM users")
        print(results)
    # Connection auto-closed here!

# Async generator — streaming data
async def stream_events():
    for i in range(5):
        await asyncio.sleep(0.5)
        yield {"event": f"update_{i}", "data": i * 10}

async def process_stream():
    async for event in stream_events():
        print(f"Received: {event}")

asyncio.run(process_stream())`,
        tip: "🧠 async with = 'borrow something, auto-return it.' async for = 'process items as they arrive, one by one.'"
      }
    ],
    quiz: [
      {
        question: "What does 'await' do?",
        options: ["Blocks the entire program", "Pauses current coroutine, lets others run", "Creates a new thread", "Kills the process"],
        answer: 1,
        explanation: "await pauses the current coroutine and lets the event loop run other tasks. The program isn't blocked!"
      },
      {
        question: "asyncio.gather() is best for?",
        options: ["Running tasks one by one", "Running multiple coroutines concurrently", "Creating threads", "Handling exceptions"],
        answer: 1,
        explanation: "gather runs multiple coroutines at the same time and waits for all to finish."
      }
    ]
  },
  {
    id: "rest-grpc-websocket",
    title: "REST, gRPC & WebSockets",
    description: "Call APIs, stream data, and build real-time communication in Python",
    icon: Globe,
    tier: "Intermediate",
    tags: ["REST", "gRPC", "WebSocket", "httpx"],
    sections: [
      {
        title: "REST APIs with httpx",
        content: "httpx is the modern Python HTTP client — supports both sync and async, HTTP/2, and more.",
        code: `import httpx
import asyncio

# --- SYNCHRONOUS ---
# GET request
response = httpx.get("https://jsonplaceholder.typicode.com/users/1")
user = response.json()
print(f"User: {user['name']}")

# POST request
new_post = httpx.post(
    "https://jsonplaceholder.typicode.com/posts",
    json={"title": "Hello", "body": "World", "userId": 1},
    headers={"Authorization": "Bearer my-token"}
)
print(f"Created: {new_post.json()['id']}")

# --- ASYNCHRONOUS (recommended for multiple calls) ---
async def fetch_multiple():
    async with httpx.AsyncClient() as client:
        # Fetch 3 users concurrently!
        responses = await asyncio.gather(
            client.get("https://jsonplaceholder.typicode.com/users/1"),
            client.get("https://jsonplaceholder.typicode.com/users/2"),
            client.get("https://jsonplaceholder.typicode.com/users/3"),
        )
        for r in responses:
            print(f"User: {r.json()['name']}")

asyncio.run(fetch_multiple())

# --- ERROR HANDLING ---
async def safe_fetch(url: str):
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(url)
            response.raise_for_status()  # raises on 4xx/5xx
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"HTTP {e.response.status_code}: {e}")
        except httpx.TimeoutException:
            print("Request timed out! ⏰")
        except httpx.RequestError as e:
            print(f"Network error: {e}")`,
        tip: "🧠 Use httpx.AsyncClient() as a 'connection pool' — reuses connections for speed. Like keeping the phone line open."
      },
      {
        title: "gRPC — Fast Binary Communication",
        content: "gRPC uses Protocol Buffers (protobuf) for **blazing fast** serialization. Perfect for microservices.",
        code: `# Step 1: Define your service in a .proto file
# greeter.proto
"""
syntax = "proto3";

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  rpc SayHelloStream (HelloRequest) returns (stream HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}
"""

# Step 2: Generate Python code
# python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. greeter.proto

# Step 3: Server
import grpc
from concurrent import futures
# import greeter_pb2, greeter_pb2_grpc  # generated files

class GreeterServicer:  # (greeter_pb2_grpc.GreeterServicer)
    def SayHello(self, request, context):
        return {"message": f"Hello, {request.name}!"}
    
    def SayHelloStream(self, request, context):
        for i in range(5):
            yield {"message": f"Hello #{i}, {request.name}!"}

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    # greeter_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("gRPC server running on :50051")
    server.wait_for_termination()

# Step 4: Client
async def grpc_client():
    async with grpc.aio.insecure_channel('localhost:50051') as channel:
        # stub = greeter_pb2_grpc.GreeterStub(channel)
        # response = await stub.SayHello(greeter_pb2.HelloRequest(name="Python"))
        # print(response.message)
        pass

# Install: pip install grpcio grpcio-tools`,
        tip: "🧠 REST = sending letters (text). gRPC = sending compressed packages (binary). Same message, gRPC is 10x smaller & faster."
      },
      {
        title: "WebSockets — Real-Time Two-Way",
        content: "WebSockets keep a persistent connection open. Perfect for chat, live updates, and streaming.",
        code: `import asyncio
import websockets
import json

# --- SERVER ---
connected_clients = set()

async def handler(websocket):
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)
            print(f"Received: {data}")
            
            # Broadcast to all connected clients
            for client in connected_clients:
                if client != websocket:
                    await client.send(json.dumps({
                        "user": data.get("user", "Anonymous"),
                        "message": data["message"]
                    }))
    finally:
        connected_clients.remove(websocket)

async def start_server():
    async with websockets.serve(handler, "localhost", 8765):
        print("WebSocket server on ws://localhost:8765")
        await asyncio.Future()  # run forever

# --- CLIENT ---
async def chat_client(username: str):
    uri = "ws://localhost:8765"
    async with websockets.connect(uri) as ws:
        # Send a message
        await ws.send(json.dumps({
            "user": username,
            "message": "Hello everyone! 👋"
        }))
        
        # Listen for messages
        async for message in ws:
            data = json.loads(message)
            print(f"{data['user']}: {data['message']}")

# Install: pip install websockets
# Run: asyncio.run(start_server()) in one terminal
#       asyncio.run(chat_client("Alice")) in another`,
        tip: "🧠 HTTP = walkie-talkie (one talks, then the other). WebSocket = phone call (both can talk anytime)."
      }
    ],
    quiz: [
      {
        question: "When should you use gRPC over REST?",
        options: ["For browser clients", "For high-performance microservice communication", "For simple CRUD APIs", "For static websites"],
        answer: 1,
        explanation: "gRPC excels at fast, typed, binary communication between services. REST is better for public/browser APIs."
      },
      {
        question: "WebSockets are best for?",
        options: ["One-time data fetch", "Real-time bidirectional communication", "File uploads", "Database queries"],
        answer: 1,
        explanation: "WebSockets maintain a persistent connection for real-time two-way data flow."
      }
    ]
  },
  {
    id: "ai-agents",
    title: "Building AI Agents",
    description: "LLM integration, tool calling, agent loops, RAG, and building intelligent systems",
    icon: Brain,
    tier: "Advanced",
    tags: ["LLM", "Agents", "Tool Calling", "RAG"],
    sections: [
      {
        title: "Your First AI Agent",
        content: "An AI agent is a loop: **Observe → Think → Act → Repeat**. It uses an LLM as its 'brain' and tools as its 'hands'.",
        code: `import openai
import json

client = openai.OpenAI()  # uses OPENAI_API_KEY env var

# Define tools the agent can use
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "City name"},
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "Search the web for information",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                },
                "required": ["query"]
            }
        }
    }
]

# Tool implementations
def get_weather(city: str) -> str:
    # In real app, call a weather API
    return json.dumps({"city": city, "temp": "72°F", "condition": "sunny"})

def search_web(query: str) -> str:
    return json.dumps({"results": [f"Result for: {query}"]})

# THE AGENT LOOP
def run_agent(user_message: str):
    messages = [
        {"role": "system", "content": "You are a helpful assistant. Use tools when needed."},
        {"role": "user", "content": user_message}
    ]
    
    while True:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
        )
        
        msg = response.choices[0].message
        messages.append(msg)
        
        # If no tool calls, we're done
        if not msg.tool_calls:
            return msg.content
        
        # Execute each tool call
        for tool_call in msg.tool_calls:
            fn_name = tool_call.function.name
            fn_args = json.loads(tool_call.function.arguments)
            
            # Call the actual function
            result = globals()[fn_name](**fn_args)
            
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": result,
            })
        # Loop continues — LLM sees tool results and decides next step

answer = run_agent("What's the weather in Tokyo and should I visit?")
print(answer)`,
        tip: "🧠 An agent is just: while True → ask LLM → if it wants a tool, run it → feed result back → repeat until LLM gives final answer."
      },
      {
        title: "Multi-Agent Systems",
        content: "Complex tasks need specialized agents working together — like a team where each person has a role.",
        code: `import asyncio
from dataclasses import dataclass
from typing import Callable

@dataclass
class Agent:
    name: str
    system_prompt: str
    tools: list
    
    async def run(self, task: str) -> str:
        """Each agent processes its part of the task."""
        print(f"🤖 [{self.name}] Working on: {task[:50]}...")
        # In real code, call LLM with self.system_prompt + task
        await asyncio.sleep(1)  # simulate LLM call
        return f"[{self.name}] completed: {task}"

class AgentOrchestrator:
    def __init__(self):
        self.agents = {}
    
    def register(self, agent: Agent):
        self.agents[agent.name] = agent
    
    async def run_pipeline(self, task: str):
        """Run agents in sequence, each building on previous output."""
        context = task
        results = []
        
        for name, agent in self.agents.items():
            result = await agent.run(context)
            results.append(result)
            context = f"{context}\\nPrevious result: {result}"
        
        return results

# Setup
orchestrator = AgentOrchestrator()
orchestrator.register(Agent(
    name="Researcher",
    system_prompt="You research topics thoroughly.",
    tools=["search_web"]
))
orchestrator.register(Agent(
    name="Writer",
    system_prompt="You write clear, engaging content.",
    tools=["write_document"]
))
orchestrator.register(Agent(
    name="Reviewer",
    system_prompt="You review and improve content.",
    tools=["grammar_check"]
))

# Run the pipeline
results = asyncio.run(orchestrator.run_pipeline(
    "Write a blog post about Python async programming"
))`,
        tip: "🧠 Multi-agent = assembly line. Researcher finds info → Writer creates content → Reviewer polishes it."
      },
      {
        title: "RAG (Retrieval-Augmented Generation)",
        content: "RAG = Give the LLM relevant context before it answers. Like giving someone a cheat sheet before a test.",
        code: `# Simple RAG implementation
from dataclasses import dataclass
import numpy as np

@dataclass
class Document:
    content: str
    embedding: list[float] = None

class SimpleRAG:
    def __init__(self):
        self.documents: list[Document] = []
    
    def add_document(self, content: str):
        """Add a document to the knowledge base."""
        # In real code, use OpenAI embeddings API
        # embedding = openai.embeddings.create(input=content, model="text-embedding-3-small")
        fake_embedding = [hash(content) % 100 / 100.0] * 384
        self.documents.append(Document(content, fake_embedding))
    
    def search(self, query: str, top_k: int = 3) -> list[str]:
        """Find most relevant documents for a query."""
        # In real code: embed query, compute cosine similarity
        # For demo, return first k documents
        return [doc.content for doc in self.documents[:top_k]]
    
    def ask(self, question: str) -> str:
        """RAG pipeline: search → augment → generate."""
        # 1. Retrieve relevant documents
        relevant_docs = self.search(question)
        
        # 2. Build augmented prompt
        context = "\\n---\\n".join(relevant_docs)
        prompt = f"""Based on the following context, answer the question.
        
Context:
{context}

Question: {question}

Answer:"""
        
        # 3. Generate answer with LLM
        # response = client.chat.completions.create(
        #     model="gpt-4o",
        #     messages=[{"role": "user", "content": prompt}]
        # )
        # return response.choices[0].message.content
        return f"Answer based on {len(relevant_docs)} documents"

# Usage
rag = SimpleRAG()
rag.add_document("Python was created by Guido van Rossum in 1991.")
rag.add_document("asyncio was added in Python 3.4.")
rag.add_document("Python 3.12 added improved error messages.")

answer = rag.ask("When was asyncio added to Python?")
print(answer)`,
        tip: "🧠 RAG = open-book exam. The LLM is smart but doesn't know YOUR data. RAG gives it the relevant pages before answering."
      }
    ],
    quiz: [
      {
        question: "What is the core loop of an AI agent?",
        options: ["Train → Deploy → Monitor", "Observe → Think → Act → Repeat", "Input → Process → Output", "Read → Write → Execute"],
        answer: 1,
        explanation: "An agent loops: observes the situation, thinks (LLM), acts (tools), and repeats until the task is done."
      }
    ]
  },
  {
    id: "voice-agents",
    title: "Voice Agents",
    description: "Speech-to-text, text-to-speech, real-time voice pipelines, and conversational AI",
    icon: Mic,
    tier: "Advanced",
    tags: ["STT", "TTS", "Voice AI", "Real-time"],
    sections: [
      {
        title: "Voice Agent Architecture",
        content: "A voice agent has 3 stages: **Ears** (STT) → **Brain** (LLM) → **Mouth** (TTS). The key challenge is making it feel real-time.",
        code: `# Voice Agent Pipeline Overview
#
# ┌──────────┐    ┌──────────┐    ┌──────────┐
# │  🎤 STT  │───▶│  🧠 LLM  │───▶│  🔊 TTS  │
# │ (Whisper)│    │ (GPT-4o) │    │(ElevenLabs)│
# └──────────┘    └──────────┘    └──────────┘
#   Audio in        Text in/out     Audio out
#   ~0.5s           ~1-3s           ~0.5s

import asyncio

class VoiceAgent:
    """A complete voice agent pipeline."""
    
    def __init__(self):
        self.conversation_history = []
    
    async def listen(self, audio_stream) -> str:
        """STT: Convert speech to text using Whisper."""
        # Using OpenAI Whisper API
        # transcript = await openai.audio.transcriptions.create(
        #     model="whisper-1",
        #     file=audio_stream,
        #     response_format="text"
        # )
        # return transcript
        return "Hello, how are you?"
    
    async def think(self, user_text: str) -> str:
        """LLM: Generate a response."""
        self.conversation_history.append(
            {"role": "user", "content": user_text}
        )
        
        # response = await openai.chat.completions.create(
        #     model="gpt-4o",
        #     messages=[
        #         {"role": "system", "content": "You are a friendly voice assistant. Keep responses short and conversational."},
        #         *self.conversation_history
        #     ],
        #     max_tokens=150,  # keep it short for voice!
        # )
        # reply = response.choices[0].message.content
        
        reply = "I'm doing great, thanks for asking!"
        self.conversation_history.append(
            {"role": "assistant", "content": reply}
        )
        return reply
    
    async def speak(self, text: str) -> bytes:
        """TTS: Convert text to speech using ElevenLabs."""
        # import elevenlabs
        # audio = elevenlabs.generate(
        #     text=text,
        #     voice="Rachel",
        #     model="eleven_turbo_v2_5",
        #     stream=True  # stream for lower latency!
        # )
        # return audio
        return b"fake_audio_data"
    
    async def run_turn(self, audio_input):
        """Run one conversation turn."""
        # Pipeline: Listen → Think → Speak
        user_text = await self.listen(audio_input)
        print(f"👤 User: {user_text}")
        
        response_text = await self.think(user_text)
        print(f"🤖 Agent: {response_text}")
        
        audio_output = await self.speak(response_text)
        return audio_output`,
        tip: "🧠 The secret to natural voice agents: **stream everything**. Don't wait for full STT → stream partial text to LLM → stream partial TTS. Overlap the stages!"
      },
      {
        title: "Real-Time Voice with WebSockets",
        content: "For production voice agents, use WebSocket streaming for low-latency audio. Here's how to build one.",
        code: `import asyncio
import websockets
import json
import base64

class RealtimeVoiceServer:
    """WebSocket server for real-time voice agent."""
    
    async def handle_client(self, websocket):
        print("🎤 Client connected")
        agent = VoiceAgent()  # from previous example
        
        try:
            async for message in websocket:
                data = json.loads(message)
                
                if data["type"] == "audio_chunk":
                    # Receive audio chunk from client
                    audio_bytes = base64.b64decode(data["audio"])
                    
                    # Process through pipeline
                    response_audio = await agent.run_turn(audio_bytes)
                    
                    # Send audio response back
                    await websocket.send(json.dumps({
                        "type": "audio_response",
                        "audio": base64.b64encode(response_audio).decode(),
                        "text": agent.conversation_history[-1]["content"]
                    }))
                
                elif data["type"] == "end_session":
                    print("👋 Session ended")
                    break
                    
        except websockets.ConnectionClosed:
            print("Client disconnected")
    
    async def start(self, host="0.0.0.0", port=8765):
        async with websockets.serve(self.handle_client, host, port):
            print(f"🎙️ Voice server running on ws://{host}:{port}")
            await asyncio.Future()

# Using OpenAI's Realtime API (cutting edge!)
async def openai_realtime_voice():
    """
    OpenAI Realtime API — direct voice-to-voice,
    no separate STT/TTS needed!
    """
    import websockets
    
    url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "OpenAI-Beta": "realtime=v1",
    }
    
    async with websockets.connect(url, extra_headers=headers) as ws:
        # Configure the session
        await ws.send(json.dumps({
            "type": "session.update",
            "session": {
                "modalities": ["text", "audio"],
                "voice": "alloy",
                "instructions": "You are a helpful voice assistant.",
                "turn_detection": {"type": "server_vad"},
            }
        }))
        
        # Send and receive audio in real-time
        async for message in ws:
            event = json.loads(message)
            if event["type"] == "response.audio.delta":
                audio_chunk = base64.b64decode(event["delta"])
                # Play audio_chunk through speakers
                pass`,
        tip: "🧠 OpenAI Realtime API is a game-changer — it does STT + LLM + TTS in ONE API call with ~300ms latency. Like talking to a human!"
      },
      {
        title: "Voice Agent with Tool Calling",
        content: "The most powerful voice agents can **do things** — book appointments, search databases, control devices.",
        code: `import asyncio
import json

class SmartVoiceAgent:
    """Voice agent with real-world capabilities."""
    
    def __init__(self):
        self.tools = {
            "check_calendar": self.check_calendar,
            "book_appointment": self.book_appointment,
            "search_knowledge": self.search_knowledge,
            "send_notification": self.send_notification,
        }
        self.tool_definitions = [
            {
                "type": "function",
                "function": {
                    "name": "check_calendar",
                    "description": "Check availability on a specific date",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "date": {"type": "string", "description": "Date in YYYY-MM-DD"}
                        },
                        "required": ["date"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "book_appointment",
                    "description": "Book an appointment",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "date": {"type": "string"},
                            "time": {"type": "string"},
                            "description": {"type": "string"}
                        },
                        "required": ["date", "time", "description"]
                    }
                }
            }
        ]
    
    async def check_calendar(self, date: str) -> str:
        await asyncio.sleep(0.3)  # simulate API call
        return json.dumps({
            "date": date,
            "available_slots": ["9:00 AM", "2:00 PM", "4:30 PM"]
        })
    
    async def book_appointment(self, date: str, time: str, description: str) -> str:
        await asyncio.sleep(0.5)
        return json.dumps({
            "status": "confirmed",
            "date": date,
            "time": time,
            "description": description,
            "confirmation_id": "APT-2024-001"
        })
    
    async def search_knowledge(self, query: str) -> str:
        return json.dumps({"results": [f"Info about: {query}"]})
    
    async def send_notification(self, message: str, to: str) -> str:
        return json.dumps({"sent": True, "to": to})

# Conversation flow:
# 👤 "Can you book me a dentist appointment next Tuesday?"
# 🤖 [calls check_calendar("2024-01-23")]
# 🤖 "I see slots at 9 AM, 2 PM, and 4:30 PM. Which works?"
# 👤 "2 PM please"
# 🤖 [calls book_appointment("2024-01-23", "2:00 PM", "Dentist")]
# 🤖 "Done! Booked for Tuesday at 2 PM. Confirmation: APT-2024-001"`,
        tip: "🧠 Voice + Tools = superpowers. The user talks naturally, the agent translates to API calls. It's like having a personal secretary who's also a programmer."
      }
    ],
    quiz: [
      {
        question: "What are the 3 stages of a voice agent?",
        options: ["Input → Process → Output", "STT → LLM → TTS", "Record → Play → Stop", "Listen → Respond → Wait"],
        answer: 1,
        explanation: "Speech-to-Text (ears) → LLM (brain) → Text-to-Speech (mouth). That's the core pipeline!"
      }
    ]
  },
  {
    id: "packaging-deployment",
    title: "Packaging & Deployment",
    description: "pip install your-package, Docker images, cloud deployment, and CI/CD",
    icon: Package,
    tier: "Intermediate → Advanced",
    tags: ["pip", "Docker", "PyPI", "CI/CD"],
    sections: [
      {
        title: "Create a pip-installable Package",
        content: "Turn your Python code into a package anyone can `pip install`. It's easier than you think!",
        code: `# Project structure:
# my-awesome-lib/
# ├── pyproject.toml        ← config (replaces setup.py)
# ├── README.md
# ├── LICENSE
# ├── src/
# │   └── my_awesome_lib/
# │       ├── __init__.py
# │       ├── core.py
# │       └── utils.py
# └── tests/
#     └── test_core.py

# --- pyproject.toml ---
"""
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "my-awesome-lib"
version = "0.1.0"
description = "A short description"
readme = "README.md"
requires-python = ">=3.9"
license = {text = "MIT"}
authors = [
    {name = "Your Name", email = "you@example.com"}
]
dependencies = [
    "httpx>=0.24",
    "pydantic>=2.0",
]

[project.optional-dependencies]
dev = ["pytest", "ruff", "mypy"]

[project.scripts]
my-cli = "my_awesome_lib.cli:main"
"""

# --- src/my_awesome_lib/__init__.py ---
"""
from .core import MyClass, my_function

__version__ = "0.1.0"
__all__ = ["MyClass", "my_function"]
"""

# --- Build & Upload ---
# pip install build twine
# python -m build                    # creates dist/
# twine upload dist/*                # uploads to PyPI!

# Now anyone can: pip install my-awesome-lib`,
        tip: "🧠 pyproject.toml is the new standard — it replaces setup.py, setup.cfg, and more. One file to rule them all!"
      },
      {
        title: "Import Functions from Other Files",
        content: "Python uses modules and packages to organize code. Here's how to reference code across files.",
        code: `# Project structure:
# my_project/
# ├── main.py
# ├── utils/
# │   ├── __init__.py
# │   ├── helpers.py
# │   └── validators.py
# └── services/
#     ├── __init__.py
#     └── api.py

# --- utils/helpers.py ---
def format_name(first: str, last: str) -> str:
    return f"{first.title()} {last.title()}"

def calculate_tax(amount: float, rate: float = 0.1) -> float:
    return amount * rate

# --- utils/__init__.py ---
# Makes 'utils' a package. Export what you want:
from .helpers import format_name, calculate_tax
from .validators import validate_email

# --- main.py ---
# Method 1: Import from package (uses __init__.py)
from utils import format_name, calculate_tax

# Method 2: Import directly from module
from utils.helpers import format_name

# Method 3: Import entire module
import utils.helpers as helpers
result = helpers.format_name("john", "doe")

# Method 4: Relative imports (within a package)
# In services/api.py:
from ..utils.helpers import format_name  # go up one level

# Method 5: Dynamic import (rare, but useful)
import importlib
module = importlib.import_module("utils.helpers")
fn = getattr(module, "format_name")`,
        tip: "🧠 __init__.py is like a reception desk — it decides what visitors (importers) can see when they visit your package."
      },
      {
        title: "Docker & Cloud Deployment",
        content: "Package your app as a Docker image and deploy anywhere — AWS, GCP, Azure, or free platforms.",
        code: `# --- Dockerfile ---
"""
FROM python:3.12-slim

WORKDIR /app

# Install dependencies first (cached layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Run the app
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
"""

# --- .dockerignore ---
"""
__pycache__
*.pyc
.git
.env
venv/
"""

# --- Build & Run ---
# docker build -t my-python-app .
# docker run -p 8000:8000 my-python-app

# --- docker-compose.yml (with database) ---
"""
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
"""

# --- FREE Hosting Options ---
# 1. GitHub Pages (static sites only)
#    - Push to gh-pages branch
#    - Settings → Pages → Deploy
#
# 2. Railway.app (apps with DB)
#    - Connect GitHub repo
#    - Auto-deploys on push
#    - Free tier available
#
# 3. Render.com
#    - Similar to Railway
#    - Free tier for web services
#
# 4. Fly.io
#    - flyctl launch
#    - flyctl deploy
#    - Free tier: 3 shared VMs`,
        tip: "🧠 Docker is like a shipping container — your app runs the same everywhere. 'Works on my machine' → 'Works everywhere.'"
      },
      {
        title: "Hosting on GitHub Pages (Free!)",
        content: "For static sites or documentation, GitHub Pages is free and automatic.",
        code: `# --- Host a Python project's docs on GitHub Pages ---

# Option 1: MkDocs (easiest for Python projects)
# pip install mkdocs mkdocs-material

# mkdocs.yml
"""
site_name: My Python Guide
theme:
  name: material
  palette:
    scheme: slate
    primary: green
nav:
  - Home: index.md
  - Getting Started: getting-started.md
  - API Reference: api.md
"""

# Deploy:
# mkdocs gh-deploy  ← builds and pushes to gh-pages branch

# Option 2: GitHub Actions auto-deploy
# .github/workflows/deploy.yml
"""
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install mkdocs mkdocs-material
      - run: mkdocs gh-deploy --force
"""

# For THIS app (React), deploy to GitHub Pages:
# 1. Push code to GitHub
# 2. In Settings → Pages → Source: "GitHub Actions"
# 3. Add workflow:
"""
name: Deploy React to Pages
on:
  push:
    branches: [main]
jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \$\{{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
"""`,
        tip: "🧠 GitHub Pages = free website hosting. Connect your repo → enable Pages → your site is live at username.github.io/repo-name"
      }
    ],
    quiz: [
      {
        question: "What file replaced setup.py as the standard Python project config?",
        options: ["requirements.txt", "pyproject.toml", "Makefile", "config.yaml"],
        answer: 1,
        explanation: "pyproject.toml is the modern standard (PEP 621) — it handles build config, dependencies, and project metadata."
      }
    ]
  },
  {
    id: "design-patterns",
    title: "Design Patterns & Best Practices",
    description: "Singleton, Factory, Observer, SOLID principles, and Pythonic patterns you should know",
    icon: Puzzle,
    tier: "Intermediate → Advanced",
    tags: ["Patterns", "SOLID", "Clean Code", "Pythonic"],
    sections: [
      {
        title: "Essential Design Patterns",
        content: "Design patterns are proven solutions to common problems. Here are the ones Python developers use most.",
        code: `# 1. SINGLETON — Only one instance ever
class Database:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.connection = "connected"
        return cls._instance

db1 = Database()
db2 = Database()
print(db1 is db2)  # True — same object!

# 2. FACTORY — Create objects without specifying exact class
class Animal:
    def speak(self): ...

class Dog(Animal):
    def speak(self): return "Woof!"

class Cat(Animal):
    def speak(self): return "Meow!"

def animal_factory(animal_type: str) -> Animal:
    animals = {"dog": Dog, "cat": Cat}
    return animals[animal_type]()

pet = animal_factory("dog")
print(pet.speak())  # Woof!

# 3. OBSERVER — React to events
class EventEmitter:
    def __init__(self):
        self._listeners = {}
    
    def on(self, event: str, callback):
        self._listeners.setdefault(event, []).append(callback)
    
    def emit(self, event: str, data=None):
        for callback in self._listeners.get(event, []):
            callback(data)

emitter = EventEmitter()
emitter.on("user_login", lambda user: print(f"Welcome {user}!"))
emitter.on("user_login", lambda user: print(f"Logging: {user} logged in"))
emitter.emit("user_login", "Alice")

# 4. STRATEGY — Swap algorithms at runtime
from typing import Callable

def bubble_sort(data): return sorted(data)
def quick_sort(data): return sorted(data, key=lambda x: -x)

class Sorter:
    def __init__(self, strategy: Callable = bubble_sort):
        self.strategy = strategy
    
    def sort(self, data):
        return self.strategy(data)

sorter = Sorter(strategy=quick_sort)
print(sorter.sort([3, 1, 4, 1, 5]))`,
        tip: "🧠 Singleton = 'there can be only one.' Factory = 'tell me what you want, I'll build it.' Observer = 'notify me when something happens.'"
      },
      {
        title: "SOLID Principles in Python",
        content: "SOLID makes code maintainable. Here's each principle with a Python example.",
        code: `from abc import ABC, abstractmethod
from typing import Protocol

# S — Single Responsibility
# Each class does ONE thing
class UserValidator:
    def validate(self, email: str) -> bool:
        return "@" in email

class UserRepository:
    def save(self, user: dict) -> None:
        print(f"Saved {user}")

class EmailService:
    def send_welcome(self, email: str) -> None:
        print(f"Welcome email sent to {email}")

# O — Open/Closed (open for extension, closed for modification)
class Discount(Protocol):
    def calculate(self, price: float) -> float: ...

class PercentageDiscount:
    def __init__(self, percent: float):
        self.percent = percent
    def calculate(self, price: float) -> float:
        return price * (1 - self.percent / 100)

class FlatDiscount:
    def __init__(self, amount: float):
        self.amount = amount
    def calculate(self, price: float) -> float:
        return price - self.amount

# Adding new discount types doesn't modify existing code!

# L — Liskov Substitution
# Subtypes must be substitutable for their base types
class Bird(ABC):
    @abstractmethod
    def move(self) -> str: ...

class Sparrow(Bird):
    def move(self) -> str: return "Flying 🐦"

class Penguin(Bird):
    def move(self) -> str: return "Swimming 🐧"
    # Don't make fly() — penguins can't fly!

# I — Interface Segregation
# Many small interfaces > one fat interface
class Readable(Protocol):
    def read(self) -> str: ...

class Writable(Protocol):
    def write(self, data: str) -> None: ...

class ReadOnlyFile:
    def read(self) -> str:
        return "data"
    # Doesn't need write()!

# D — Dependency Inversion
# Depend on abstractions, not concrete classes
class NotificationService(Protocol):
    def send(self, message: str) -> None: ...

class EmailNotifier:
    def send(self, message: str) -> None:
        print(f"Email: {message}")

class SlackNotifier:
    def send(self, message: str) -> None:
        print(f"Slack: {message}")

class OrderService:
    def __init__(self, notifier: NotificationService):
        self.notifier = notifier  # depends on Protocol, not class
    
    def place_order(self, item: str):
        self.notifier.send(f"Order placed: {item}")

# Easy to swap!
service = OrderService(SlackNotifier())
service.place_order("Python Book")`,
        tip: "🧠 SOLID = S(one job) O(extend, don't modify) L(subtypes work everywhere) I(small interfaces) D(depend on abstractions)"
      },
      {
        title: "Pythonic Best Practices",
        content: "Write Python that experienced developers will respect. These patterns are idiomatic and efficient.",
        code: `# 1. Use context managers for resource cleanup
with open("file.txt") as f:
    data = f.read()
# File auto-closed! No try/finally needed

# 2. EAFP > LBYL (Ask forgiveness, not permission)
# ❌ LBYL (Look Before You Leap)
if "key" in dictionary:
    value = dictionary["key"]

# ✅ EAFP (Easier to Ask Forgiveness)
try:
    value = dictionary["key"]
except KeyError:
    value = "default"

# Even better:
value = dictionary.get("key", "default")

# 3. Use enumerate, not range(len())
fruits = ["apple", "banana", "cherry"]
# ❌ 
for i in range(len(fruits)):
    print(i, fruits[i])
# ✅
for i, fruit in enumerate(fruits):
    print(i, fruit)

# 4. Use zip for parallel iteration
names = ["Alice", "Bob"]
scores = [95, 87]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# 5. Use pathlib, not os.path
from pathlib import Path
config = Path("~/.config/myapp").expanduser()
config.mkdir(parents=True, exist_ok=True)
(config / "settings.json").write_text('{"theme": "dark"}')

# 6. Use typing for clarity
from typing import Optional, Union

def find_user(user_id: int) -> Optional[dict]:
    """Returns user dict or None if not found."""
    users = {1: {"name": "Alice"}}
    return users.get(user_id)

# 7. Use walrus operator for cleaner code
import re
if match := re.search(r"(\\d+)", "Age: 25"):
    print(f"Found number: {match.group(1)}")

# 8. Use slots for memory-efficient classes
class Point:
    __slots__ = ('x', 'y')
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y`,
        tip: "🧠 'Pythonic' = using the language the way it was designed. Like speaking a foreign language with proper idioms, not translating word-by-word."
      }
    ],
    quiz: [
      {
        question: "What does the Single Responsibility Principle mean?",
        options: ["A class can only have one method", "A class should have one reason to change", "Only one instance allowed", "One file per class"],
        answer: 1,
        explanation: "SRP = each class has one job/responsibility. If it needs to change, there should be only one reason."
      },
      {
        question: "What does EAFP stand for?",
        options: ["Every Action Follows Protocol", "Easier to Ask Forgiveness than Permission", "Execute After Full Processing", "Error And Fault Prevention"],
        answer: 1,
        explanation: "EAFP — try to do it, handle the exception if it fails. It's the Pythonic way vs checking everything first (LBYL)."
      }
    ]
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    description: "pytest, mocking, test patterns, debugging tools, and TDD workflow",
    icon: FlaskConical,
    tier: "Intermediate",
    tags: ["pytest", "Mocking", "TDD", "Debugging"],
    sections: [
      {
        title: "pytest Essentials",
        content: "pytest is Python's most popular testing framework. Simple, powerful, and extensible.",
        code: `# test_calculator.py
import pytest

# Simple test
def test_addition():
    assert 1 + 1 == 2

# Test with expected exception
def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        1 / 0

# Parametrized tests — test many cases at once!
@pytest.mark.parametrize("input,expected", [
    ("hello", 5),
    ("", 0),
    ("Python", 6),
    ("  spaces  ", 10),
])
def test_string_length(input, expected):
    assert len(input) == expected

# Fixtures — reusable test setup
@pytest.fixture
def sample_users():
    return [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25},
    ]

def test_user_count(sample_users):
    assert len(sample_users) == 2

def test_oldest_user(sample_users):
    oldest = max(sample_users, key=lambda u: u["age"])
    assert oldest["name"] == "Alice"

# Async test
@pytest.mark.asyncio
async def test_async_fetch():
    result = await asyncio.sleep(0.1)
    assert result is None

# Run: pytest -v
# Run specific: pytest test_calculator.py::test_addition
# Run with coverage: pytest --cov=src`,
        tip: "🧠 Write tests like a story: Given (setup) → When (action) → Then (assertion). Each test tells what should happen."
      },
      {
        title: "Mocking & Patching",
        content: "Mock external dependencies so your tests are fast, reliable, and don't call real APIs.",
        code: `from unittest.mock import Mock, patch, AsyncMock
import pytest

# The code we're testing
class WeatherService:
    def __init__(self, api_client):
        self.api = api_client
    
    def get_forecast(self, city: str) -> str:
        data = self.api.get(f"/weather/{city}")
        temp = data["temperature"]
        return f"{city}: {temp}°F"

# Test with Mock
def test_forecast():
    # Create a mock API client
    mock_api = Mock()
    mock_api.get.return_value = {"temperature": 72, "condition": "sunny"}
    
    service = WeatherService(mock_api)
    result = service.get_forecast("NYC")
    
    assert result == "NYC: 72°F"
    mock_api.get.assert_called_once_with("/weather/NYC")

# Patch — temporarily replace real objects
@patch("my_module.requests.get")
def test_api_call(mock_get):
    mock_get.return_value.json.return_value = {"status": "ok"}
    mock_get.return_value.status_code = 200
    
    # Your code that uses requests.get will use the mock
    # result = my_function()
    # assert result == "ok"

# Mock async functions
@pytest.mark.asyncio
async def test_async_service():
    mock_client = AsyncMock()
    mock_client.fetch.return_value = {"data": "test"}
    
    result = await mock_client.fetch("url")
    assert result == {"data": "test"}`,
        tip: "🧠 Mocking = creating a stunt double for your dependencies. The test thinks it's the real thing, but it's safe and predictable."
      }
    ],
    quiz: [
      {
        question: "What does @pytest.fixture do?",
        options: ["Skips the test", "Provides reusable test setup/data", "Marks test as slow", "Runs test in parallel"],
        answer: 1,
        explanation: "Fixtures provide reusable setup data. Any test function can receive fixture data as a parameter."
      }
    ]
  },
  {
    id: "advanced-concepts",
    title: "Advanced Python Concepts",
    description: "Generators, context managers, metaclasses, descriptors, and memory management",
    icon: Terminal,
    tier: "Advanced",
    tags: ["Generators", "Metaclasses", "GIL", "Memory"],
    sections: [
      {
        title: "Generators & Iterators",
        content: "Generators produce values **lazily** — one at a time, on demand. Perfect for large datasets that don't fit in memory.",
        code: `# Generator function (uses yield)
def countdown(n):
    print("Starting countdown!")
    while n > 0:
        yield n    # pauses here, resumes on next()
        n -= 1
    print("Liftoff! 🚀")

for num in countdown(3):
    print(num)
# Starting countdown!
# 3, 2, 1
# Liftoff! 🚀

# Generator expression (like list comp, but lazy)
squares_list = [x**2 for x in range(1000000)]   # 8MB in memory!
squares_gen = (x**2 for x in range(1000000))     # ~100 bytes!

# Real-world: Process large CSV without loading it all
def read_large_csv(filepath):
    with open(filepath) as f:
        header = next(f).strip().split(",")
        for line in f:
            values = line.strip().split(",")
            yield dict(zip(header, values))

# Processes one row at a time — 1GB file? No problem!
# for row in read_large_csv("huge_data.csv"):
#     process(row)

# itertools — the Swiss army knife
from itertools import chain, islice, groupby

# Chain multiple iterables
all_items = chain([1, 2], [3, 4], [5, 6])  # 1,2,3,4,5,6

# Take first N from infinite generator
def infinite_ids():
    n = 1
    while True:
        yield f"ID-{n:04d}"
        n += 1

first_5 = list(islice(infinite_ids(), 5))
# ['ID-0001', 'ID-0002', 'ID-0003', 'ID-0004', 'ID-0005']`,
        tip: "🧠 A generator is like a bookmark — it remembers where it stopped and picks up there next time. A list is like a photocopy of the whole book."
      },
      {
        title: "Context Managers Deep Dive",
        content: "Create your own `with` statements for clean resource management.",
        code: `from contextlib import contextmanager, asynccontextmanager
import time

# Method 1: Class-based
class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"⏱️ Took {self.elapsed:.4f}s")
        return False  # don't suppress exceptions

with Timer() as t:
    sum(range(1000000))
# ⏱️ Took 0.0234s

# Method 2: Generator-based (simpler!)
@contextmanager
def temporary_directory():
    import tempfile, shutil
    tmpdir = tempfile.mkdtemp()
    print(f"📁 Created {tmpdir}")
    try:
        yield tmpdir     # everything before yield = __enter__
    finally:
        shutil.rmtree(tmpdir)  # everything after = __exit__
        print(f"🗑️ Cleaned up {tmpdir}")

with temporary_directory() as tmpdir:
    print(f"Working in {tmpdir}")

# Method 3: Async context manager
@asynccontextmanager
async def managed_connection(url: str):
    print(f"🔌 Connecting to {url}")
    conn = {"url": url, "status": "open"}  # fake connection
    try:
        yield conn
    finally:
        conn["status"] = "closed"
        print(f"🔌 Disconnected from {url}")`,
        tip: "🧠 Context managers = automatic cleanup. Like a self-closing door — you walk through, it closes behind you."
      },
      {
        title: "The GIL & Concurrency Models",
        content: "The GIL (Global Interpreter Lock) limits Python to one thread executing Python code at a time. Here's how to work around it.",
        code: `import asyncio
import multiprocessing
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# WHEN TO USE WHAT:
# 
# I/O-bound (network, files, DB)  → asyncio or threads
# CPU-bound (math, image processing) → multiprocessing
#
# ┌─────────────┬──────────────┬───────────────┐
# │   asyncio   │   threads    │  processes    │
# ├─────────────┼──────────────┼───────────────┤
# │ Best for    │ Best for I/O │ Best for CPU  │
# │ I/O-bound   │ with legacy  │ heavy work    │
# │ Single      │ code         │ True parallel │
# │ thread      │ GIL limited  │ No GIL!       │
# └─────────────┴──────────────┴───────────────┘

# Threading (I/O-bound tasks)
def fetch_url(url):
    import urllib.request
    return urllib.request.urlopen(url).read()[:100]

with ThreadPoolExecutor(max_workers=5) as pool:
    urls = ["https://python.org"] * 3
    results = list(pool.map(fetch_url, urls))

# Multiprocessing (CPU-bound tasks)
def heavy_computation(n):
    return sum(i * i for i in range(n))

with ProcessPoolExecutor() as pool:
    numbers = [10_000_000, 20_000_000, 30_000_000]
    results = list(pool.map(heavy_computation, numbers))
    print(f"Results: {results}")

# asyncio (modern I/O-bound — preferred)
async def fetch_all():
    import httpx
    async with httpx.AsyncClient() as client:
        tasks = [
            client.get(f"https://jsonplaceholder.typicode.com/posts/{i}")
            for i in range(1, 6)
        ]
        responses = await asyncio.gather(*tasks)
        return [r.json()["title"] for r in responses]

# Rule of thumb:
# - Network calls? → asyncio
# - Number crunching? → multiprocessing  
# - Legacy blocking code? → threading`,
        tip: "🧠 GIL = only one person can use the kitchen at a time. Threads = taking turns cooking. Processes = everyone gets their own kitchen."
      }
    ],
    quiz: [
      {
        question: "When should you use multiprocessing over asyncio?",
        options: ["For network requests", "For CPU-bound tasks", "For file I/O", "For database queries"],
        answer: 1,
        explanation: "Multiprocessing bypasses the GIL by using separate processes — each with its own Python interpreter. Perfect for CPU-heavy work."
      },
      {
        question: "What makes generators memory-efficient?",
        options: ["They compress data", "They produce values lazily, one at a time", "They use C extensions", "They cache results"],
        answer: 1,
        explanation: "Generators yield one value at a time instead of creating the entire collection in memory. A generator for 1M items uses ~100 bytes vs ~8MB for a list."
      }
    ]
  },
];
