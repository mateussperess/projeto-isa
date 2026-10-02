# Instalar ...

sudo apt update
sudo apt install python3-venv python3-pip -y

## 1. Criar e ativar o ambiente virtual
python3 -m venv .venv
source .venv/bin/activate

## 2. Instalar as dependências do Python
pip install -r requirements.txt

## 3. Aplicar as migrações no banco SQLite
python manage.py migrate

## (Opcional) Criar um usuário administrador para o painel de admin
python manage.py createsuperuser

## 4. Iniciar o servidor Django
python manage.py runserver 8001 (pra rodar na porta 8001)

cd frontend
npm run dev
