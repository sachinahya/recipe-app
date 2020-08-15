export TYPEORM_CONNECTION="postgres"
export TYPEORM_URL=$DATABASE_URL
export TYPEORM_ENTITIES="src/entities/**/*.ts"
export TYPEORM_MIGRATIONS="src/migrations/**/*.ts"
export TYPEORM_SUBSCRIBERS="src/subscribers/**/*.ts"
export TYPEORM_ENTITIES_DIR="src/entities"
export TYPEORM_MIGRATIONS_DIR="src/migrations"
export TYPEORM_SUBSCRIBERS_DIR="src/subscribers"

yarn migrate:db
