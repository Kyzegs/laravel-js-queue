# Laravel JavaScript Queue

Create jobs for your Laravel application using JavaScript and TypeScript.

## Install

```bash
npm install laravel-queues # npm
yarn add laravel-queues # Yarn
pnpm add laravel-queues # pnpm
```

## Usage

### Basic dispatch

```php
class Ping implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        echo 'Pong';
    }
}
```

```ts
import { Queue, Job } from 'laravel-queues';

const queue = new Queue();
const job = new Job({
    name: 'Ping',
});

queue.dispatch(job);
```

### Dispatching with data

```php
class Country implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $country,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Do something with the country code
        echo $this->country;
    }
}
```

```ts
import { Queue, Job } from 'laravel-queues';

const queue = new Queue();
const job = new Job({
    name: 'Country',
    data: {
        country: 'NL',
    },
});

queue.dispatch(job);
```

### Dispatching with model

```php
class AssignRole implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public Role $role,
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Give role to user
        echo $this->role;
    }
}
```

```ts
import { Queue, Job, Model } from 'laravel-queues';

const queue = new Queue();
const job = new Job({
    name: 'AssignRole',
    data: {
        role: new Model({
            class: 'Spatie\\Permission\\Models\\Role',
            id: 1,
        }),
    },
});

queue.dispatch(job);
```

### Connection options

```ts
import { Queue } from 'laravel-queues';

const queue = new Queue({
    appName: 'laravel-queues',
    connection: {
        username: 'root',
        password: 'laravel-queues',
        socket: {
            host: 'localhost',
            port: 6379,
        },
    },
});
```

### Different namespace

```ts
const job = new Job({
    name: 'Ping',
    namespace: 'App\\Jobs\\Nested\\Deeper'
});
```
