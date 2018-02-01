<?php

//	phpinfo();
//	exit();

//  REPORTS ALL ERRORS. FYI: PHP.NET RECOMMENDS *NOT* USING ini_set TO CHANGE ERROR REPORTING SETTINGS.
//  JGD
error_reporting(E_ALL);

//  DISALLOWS THE USE OF ENV, GET, POST, SERVER, OR COOKIE VARS IN THE GLOBAL SCOPE.  THIS HELPS PREVENT SECURITY ISSUES!!!
//  JGD
ini_set('register_globals', 'Off');

//  ALLOWS THE USE OF THE $php_errormsg SUPERGLOBAL TO TRACK THE LAST PHP ERROR.
//  JGD
ini_set('track_errors', '1');

//  ALLOWS THE USE OF $_ENV, $_GET, $_POST, ETC.
//  JGD
ini_set('track_vars', 'On');

//  ANYTHING THAT IS SET TO $GLOBALS['sda'] BEFORE HERE WILL BE KILLED BY THIS NEXT LINE:
//  JGD
$GLOBALS['sda'] = array();

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

if ( !empty( $_REQUEST ) ) {
    foreach ( $_REQUEST as $key => $value ) {
        $GLOBALS['sda'][$key] = secure_variable( $value );
    }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

$columns = array(
	  'representational'
	, 'non-representational'
	, 'imaginative'
	, 'free'
	//	rando
);

//	semicdraw.php?s=imaginative
if ( array_key_exists( 's', $GLOBALS['sda'] ) ) {	
	if ( in_array( $GLOBALS['sda']['s'], $columns ) ) {
		$column = $GLOBALS['sda']['s'];
	} elseif ( 'rando' == $GLOBALS['sda']['s'] ) {
		$elem 	= array_rand( $columns, 1 );
		$column	= $columns[$elem];
	} else {
		$column = 'free';
	}

	process_results( $column );
} else {
	process_results();
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function secure_variable( $variable ) {
    $ret = $variable;

    if ( is_array( $variable ) ) {
        foreach ( $variable as $key => $value ) {
            if ( is_array( $value ) ) {
                $variable[$key] = secure_variable( $value );
            } else {
                $variable[$key] = strip_string( $value );
            }
        }

        $ret = $variable;
    } else {
        $ret = strip_string( $variable );
    }
    
    return $ret;
}

//////////////////////////////////////////////////////////////////////

//	SHOULD WE WORRY ABOUT urlencodeING $variable?
function strip_string( $variable ) {
	return escapeshellcmd( htmlentities( strip_tags( trim( $variable ) ), ENT_QUOTES, 'UTF-8' ) );
}

//////////////////////////////////////////////////////////////////////

function process_results( $column = 'free' ) {
	$ret 	= '';
	
	$dsn	= 'mysql';
	$host	= 'localhost';
	$dbname	= 'redleaf_semic';
	$user	= 'redleaf_semic';
	$pass	= 'semicPa55';
	$db		= 'sda_keywords_' . $column;

	try {
		$dbh 	= new PDO( $dsn . ':host=' . $host . ';dbname=' . $dbname, $user, $pass );
		$sql	= '
			SELECT
				keywords
			FROM
				`' . $db . '` AS r1
			JOIN
			(
				SELECT
					CEIL
					(
						RAND() *
						(
							SELECT
								MAX( id )
							FROM
								`' . $db . '`
						)
					) AS id
			) AS r2
			WHERE
				r1.id >= r2.id
			ORDER BY
				r1.id ASC
			LIMIT
				1
	
			;
		';
		//	exit( 'SQL: ' . $sql . "<br>\n" );
		
		$stmt	= $dbh->prepare( $sql );
	
		if ( true === $stmt->execute() ) {
			$results = $stmt->fetch( PDO::FETCH_ASSOC );

			if ( is_array( $results ) && !empty( $results ) ) {
				if ( false !== $results ) {
					$ret = json_encode( $results );
				} else {
					$ret = 'Error. These results are... troublesome.';
				}
			}
		} else {
			//	$ret = json_encode( 'Error: Could not execute statement for [' . $column . ']: <pre>' . print_r( $stmt->errorInfo(), true ) . '</pre>.' );
			$ret = 'Error. This just ain\'t happening: ' . print_r( $stmt->errorInfo(), true );
		}
	} catch( PDOException $e ) {
		$ret = 'Error. Mama\'s not going to be happy about this:' . $e->getMessage();
	}
	
	//	header('Access-Control-Allow-Origin: http://' . $_SERVER['SERVER_NAME'] );
	header( 'Content-type: application/json;charset=utf-8' );
	print_r( $ret );
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

?>
