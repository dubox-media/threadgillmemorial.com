<!DOCTYPE html>
<html lang="en" dir="ltr">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta name="robots" content="noindex">
<title>Export: threadgill-dev_2344443 - Adminer</title>
<link rel="stylesheet" type="text/css" href="?file=default.css&amp;version=3.6.3">
<script type="text/javascript" src="?file=functions.js&amp;version=3.6.3"></script>
<link rel="shortcut icon" type="image/x-icon" href="?file=favicon.ico&amp;version=3.6.3" id="favicon">

<body class="ltr nojs" onkeydown="bodyKeydown(event);" onclick="bodyClick(event);" onload="bodyLoad('5.1');">
<script type="text/javascript">
document.body.className = document.body.className.replace(/ nojs/, ' js');
</script>

<div id="content">
<p id="breadcrumb"><a href="?server=localhost">MySQL</a> &raquo; <a href='?server=localhost&amp;username=root' accesskey='1' title='Alt+Shift+1'>localhost</a> &raquo; <a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443">threadgill-dev_2344443</a> &raquo; Export
<h2>Export: threadgill-dev_2344443</h2>

<form action="" method="post">
<table cellspacing="0">
<tr><th>Output<td><label><input type='radio' name='output' value='text' checked>open</label><label><input type='radio' name='output' value='file'>save</label><label><input type='radio' name='output' value='gz'>gzip</label><label><input type='radio' name='output' value='bz2'>bzip2</label>
<tr><th>Format<td><label><input type='radio' name='format' value='sql' checked>SQL</label><label><input type='radio' name='format' value='csv'>CSV,</label><label><input type='radio' name='format' value='csv;'>CSV;</label><label><input type='radio' name='format' value='tsv'>TSV</label>
<tr><th>Database<td><select name='db_style'><option selected><option>USE<option>DROP+CREATE<option>CREATE<option>CREATE+ALTER</select><label for='checkbox-1'><input type='checkbox' name='routines' value='1' checked id='checkbox-1'>Routines</label><label for='checkbox-2'><input type='checkbox' name='events' value='1' checked id='checkbox-2'>Events</label><tr><th>Tables<td><select name='table_style'><option><option selected>DROP+CREATE<option>CREATE<option>CREATE+ALTER</select><label for='checkbox-3'><input type='checkbox' name='auto_increment' value='1' id='checkbox-3'>Auto Increment</label><label for='checkbox-4'><input type='checkbox' name='triggers' value='1' checked id='checkbox-4'>Triggers</label><tr><th>Data<td><select name='data_style'><option><option>TRUNCATE+INSERT<option selected>INSERT<option>INSERT+UPDATE</select></table>
<p><input type="submit" value="Export">

<table cellspacing="0">
<thead><tr><th style='text-align: left;'><label><input type='checkbox' id='check-tables' checked onclick='formCheck(this, /^tables\[/);'>Tables</label><th style='text-align: right;'><label>Data<input type='checkbox' id='check-data' checked onclick='formCheck(this, /^data\[/);'></label></thead>
<tr><td><label for='checkbox-5'><input type='checkbox' name='tables[]' value='products' checked onclick="checkboxClick(event, this); formUncheck(&#039;check-tables&#039;);" id='checkbox-5'>products</label><td align='right'><label>~ 5<input type='checkbox' name='data[]' value='products' checked onclick="checkboxClick(event, this); formUncheck(&#039;check-data&#039;);" id='checkbox-6'></label>
<tr><td><label for='checkbox-7'><input type='checkbox' name='tables[]' value='users' checked onclick="checkboxClick(event, this); formUncheck(&#039;check-tables&#039;);" id='checkbox-7'>users</label><td align='right'><label>~ 1<input type='checkbox' name='data[]' value='users' checked onclick="checkboxClick(event, this); formUncheck(&#039;check-data&#039;);" id='checkbox-8'></label>
</table>
</form>
</div>

<div id="menu">
<h1>
<a href='http://www.adminer.org/' id='h1'>Adminer</a> <span class="version">3.6.3</span>
<a href="http://www.adminer.org/#download" id="version"></a>
</h1>
<form action="" method="post">
<p class="logout">
<a href='?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;sql='>SQL command</a>
<a href='?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;dump=' id='dump' class='active'>Dump</a>
<input type="submit" name="logout" value="Logout" id="logout">
<input type="hidden" name="token" value="389103">
</p>
</form>
<form action="">
<p id="dbs">
<input type="hidden" name="server" value="localhost"><input type="hidden" name="username" value="root"><select name='db' onchange="this.form.submit();"><option value="">(database)<option>information_schema<option>css<option>db_wiz_ats_virtual<option>db_wiz_wiz2_virtual<option>lb2_middleman<option>listbaby<option>mysql<option>phpmyadmin<option selected>threadgill-dev_2344443<option>wizard_central</select><input type="submit" value="Use" class='hidden'>
<input type="hidden" name="dump" value=""></p></form>
<p><a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;create=">Create new table</a>
<p id='tables' onmouseover='menuOver(this, event);' onmouseout='menuOut(this);'>
<a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;select=products">select</a> <a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;table=products" title='Show structure'>products</a><br>
<a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;select=users">select</a> <a href="?server=localhost&amp;username=root&amp;db=threadgill-dev_2344443&amp;table=users" title='Show structure'>users</a><br>
<script type='text/javascript'>
var jushLinks = { sql: [ '?server=localhost&username=root&db=threadgill-dev_2344443&table=$&', /\b(products|users)\b/g ] };
jushLinks.bac = jushLinks.sql;
jushLinks.bra = jushLinks.sql;
jushLinks.sqlite_quo = jushLinks.sql;
jushLinks.mssql_bra = jushLinks.sql;
</script>
</div>
