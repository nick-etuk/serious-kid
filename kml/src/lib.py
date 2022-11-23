from collections import namedtuple
import inspect
from types import SimpleNamespace
from dateutil.parser import parse
import sqlite3 as sl
from config import db


def get_last_seq():
    sql = """
    select seq, timestamp
    from actual_total act
    where seq=(
        select max(seq) from actual_total
        )
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    return row.seq, row.timestamp


def get_last_run_id():
    sql = """
    select run_id, timestamp
    from actual_total act
    where seq=(
        select max(seq) from actual_total
        )
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql).fetchone()

    return row.run_id, row.timestamp


def previous_values_days_ago(account_id: int, product_id: int, days: float):
    sql = """
    select seq, run_id, timestamp, amount
    from actual_total act
    where seq=
        (select max(seq) from actual_total
        where account_id=act.account_id
        and product_id=act.product_id
        and timestamp < date('now',?))
    and account_id=?
    and product_id=?
    and act.status='A'
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (f'-{days-1} days', account_id,
                        product_id)).fetchone()

    return row


def previous_values_by_seq(seq, account_id, product_id):
    sql = """
    select seq, run_id, timestamp, amount
    from actual_total act
    where seq=
        (select max(seq) from actual_total
        where account_id=act.account_id
        and product_id=act.product_id
        and seq<?)
    and account_id=?
    and product_id=?
    and act.status='A'
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (seq, account_id,
                        product_id)).fetchone()

    return row


def previous_values_by_run_id(run_id, account_id, product_id):
    sql = """
    select run_id, timestamp, amount
    from actual_total act
    where run_id=
        (select max(run_id) from actual_total
        where account_id=act.account_id
        and product_id=act.product_id
        and run_id<?)
    and seq=
        (select max(seq) from actual_total
        where account_id=act.account_id
        and product_id=act.product_id
        and run_id=act.run_id)
    and account_id=?
    and product_id=?
    and act.status='A'
    """
    with sl.connect(db) as conn:
        conn.row_factory = named_tuple_factory
        c = conn.cursor()
        row = c.execute(sql, (run_id, account_id,
                        product_id)).fetchone()

    return row


def calc_apr(principal: float, change: float, days: float):
    if days == 0 or principal == 0:
        return 0
    years = days/365
    apr = (change/(years*principal))*100
    return apr


def to_datetime(obj):
    if type(obj).__name__ == "str":
        result = parse(obj)
    else:
        result = obj

    #log(f"to_datetime {type(obj)} {obj} = {type(result)} {result}")
    return result


def named_tuple_factory(cursor, row):
    fields = [col[0] for col in cursor.description]
    Row = namedtuple("Row", fields)
    return Row(*row)


def simple_namespace_factory(cursor, row):
    my_dict = {}
    index = 0
    for col in cursor.description:
        my_dict[col[0]] = row[index]
        index += 1

    result = SimpleNamespace(**my_dict)
    return result


def build_insert_statement(table_name, json_rows):
    """
    Forms an SQL insert statement from a json list of rows.
    """
    record_list = json_rows
    # create a nested list of the records' values
    values = [list(x.values()) for x in record_list]

    # get the column names
    columns = [list(x.keys()) for x in record_list][0]

    # value string for the SQL string
    values_str = ""

    # enumerate over the records' values
    for i, record in enumerate(values):

        # declare empty list for values
        val_list = []

        # append each value to a new list of values
        for v, val in enumerate(record):
            if type(val) == str:
                val = f"'{val}'"
            if val == None:
                val = 'null'
            val_list += [str(val)]

        # put parenthesis around each record string
        values_str += "(" + ', '.join(val_list) + "),\n"

    # remove the last comma and end SQL with a semicolon
    values_str = values_str[:-2] + ";"

    sql_string = "INSERT INTO %s (%s)\nVALUES %s" % (
        table_name,
        ', '.join(columns),
        values_str
    )
    # log(sql_string)
    return sql_string


def log_level(instance_id):
    return "D"


def clean_name(filename):
    """
    Removes illegal characters from file names.
    """
    filename = filename.strip().casefold()
    illegals = r'/<>:"/\|?*'
    for char in filename:
        if char in illegals:
            filename = filename.replace(char, "_")

    return filename


if __name__ == "__main__":
    pass
    '''
    src_conn = pyodbc.connect(f'DRIVER={{ODBC Driver 13 for SQL Server}};SERVER=PL-L-DTAAPP-L1;DATABASE=ETL_DEV;Trusted_Connection=yes;')
    src_conn.autocommit = True

    conn = sl.connect(':memory:')
    db_filename = os.path.join(config.config_dir,"config.db")
    conn.execute(f"attach database ? as 'etl'",(db_filename,))
    conn.row_factory = named_tuple_factory
    #sync_config(src_conn, conn) 
    c = conn.cursor()
    rows = c.execute(f"Select * from {schema}ProcessInstance").fetchall()
    for row in rows:
        log(row)
        log(row.InstanceID,row.ProcessID, row.StartDtm)
    
    conn.close()
    '''
