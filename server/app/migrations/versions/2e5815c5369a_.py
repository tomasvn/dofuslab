"""empty message

Revision ID: 2e5815c5369a
Revises: fdde057164c6
Create Date: 2020-04-09 21:11:36.764119

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "2e5815c5369a"
down_revision = "fdde057164c6"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.rename_table("user", "user_account")
    op.add_column("user_account", sa.Column("locale", sa.String(), nullable=True))
    op.execute("UPDATE user_account SET locale = 'en'")
    op.alter_column("user_account", "locale", nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("user_account", "locale")
    op.rename_table("user_account", "user")
    # ### end Alembic commands ###
