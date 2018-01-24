<?php
header('Content-type: application/json');

$server = "localhost";

$database = "semicdraw_drawapp";

/*

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

*/

$dbh = new PDO( 'mysql:host=' . $server . ';dbname=' . $database, $username, $password );

$sql = "SELECT * FROM `" . $database . "`.`semicdraw_keywords` WHERE 1";

$stmt = $dbh->prepare(
  $sql
);

//  $result = mysql_query($sql) or die ("Query error: " . mysql_error());

if (true === $stmt->execute()) {
 $results = $stmt->fetch(PDO::FETCH_ASSOC);
}

//  $keywords = array();
/*
while($row = mysql_fetch_assoc($result)) {
    $keywords[] = $row;
}

mysql_close($con);
*/
print_r( $results );

//  echo $_GET['jsoncallback'] . '(' . json_encode($keywords) . ');';
?>
