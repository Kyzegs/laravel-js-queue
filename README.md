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

### Connection options for driver

```ts
import { Queue } from 'laravel-queues';

const queue = new Queue({
    driver: {
        type: 'redis',
        options: {
            socket: {
                host: '127.0.0.1',
                port: 6379,
            },
        },
    },
});
```

### Database driver

Ensure that you have the `jobs` table in your database to make use of the database driver. You can create a migration for the jobs table by running the `php artisan queue:table` command.

You'll also be required to install another dependency depending on the database you're using. For example, if you're using MySQL, you'll need to install the `mysql2` package. You can find a full rundown of the required dependencies for your database driver [here](https://typeorm.io/#installation).

> ℹ️ You only have to follow step 4 of the installation guide. The other steps are already done for you.

```ts
import { Queue } from 'laravel-queues';

const queue = new Queue({
    driver: {
        type: 'database',
        options: {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'laravel',
            username: 'root',
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
