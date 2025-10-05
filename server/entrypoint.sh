#!/bin/sh

# Make migrations and migrate the database.
echo "Making migrations and migrating the database. "
python manage.py makemigrations --noinput
python manage.py migrate --run-syncdb --noinput

if [[ $CREATE_SUPERUSER == "True" ]]; then
    echo "Creating superuser."
    python manage.py createsuperuser --noinput
fi

python manage.py collectstatic --noinput

exec "$@"