# Laravel JavaScript Queue

Create jobs for your Laravel application using JavaScript and TypeScript.

## Install

```bash
npm install laravel-js-queue # npm
yarn add laravel-js-queue # Yarn
pnpm add laravel-js-queue # pnpm
```

## Usage

### Basic job dispatch

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
import { Queue, Job } from 'laravel-js-queue';

const queue = new Queue();
const job = new Job({
    name: 'Ping',
});

queue.dispatch(job);
```

### Job dispatching with data

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
import { Queue, Job } from 'laravel-js-queue';

const queue = new Queue();
const job = new Job({
    name: 'Country',
    data: {
        country: 'NL',
    },
});

queue.dispatch(job);
```

### Connection options

```ts
import { Queue } from 'laravel-js-queue';

const queue = new Queue({
    appName: 'laravel-js-queue',
    connection: {
        username: 'root',
        password: 'laravel-js-queue',
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