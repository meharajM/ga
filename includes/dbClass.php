<?php
# My database Class called myDBC
class myDBC {

# our mysqli object instance
public $mysqli = null;

# Class constructor override
public function __construct() {
 
	require_once('db.php');
	       
	$this->mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
	# $this->mysqli = $conn;
	if ($this->mysqli->connect_errno) {
	    echo "Error MySQLi: ("&nbsp. $this->mysqli->connect_errno.")" .$this->mysqli->connect_error;
	    exit();
	}
	   $this->mysqli->set_charset("utf8"); 
	}

	# Class deconstructor override
	public function __destruct() {
	   $this->CloseDB();
	}

	# runs a sql query
	public function runQuery($qry) {
		$result = $this->mysqli->query($qry);
		return $result;
	}

	# runs multiple sql queres
	public function runMultipleQueries($qry) {
        $result = $this->mysqli->multi_query($qry);
        return $result;
	}

	# Close database connection
    public function CloseDB() {
        $this->mysqli->close();
    }

	# Escape the string get ready to insert or update
    public function clearText($text) {
        $text = trim($text);
        return $this->mysqli->real_escape_string($text);
    }

	# Get the last insert id 
    public function lastInsertID() {
        return $this->mysqli->insert_id;
    }

	# Gets the total count and returns integer
	public function totalCount($fieldname, $tablename, $where = "") 
	{
	  $q = "SELECT count(".$fieldname.") FROM " . $tablename . " " . $where;
	        
	$result = $this->mysqli->query($q);
	$count = 0;
	if ($result) {
	    while ($row = mysqli_fetch_array($result)) {
	    $count = $row[0];
	   }
	  }
	  return $count;
	}


# below code for prepare statements

	public function query($query) {
			$db = $this->mysqli;
			$result = $db->query($query);			
			while ( $row = $result->fetch_object() ) {
				$results[] = $row;
			}
			
			return $results;
	}

	public function insert($table, $data, $format) {
		// Check for $table or $data not set
		if ( empty( $table ) || empty( $data ) ) {
			return false;
		}		
		// Connect to the database
		$db = $this->mysqli;		
		// Cast $data and $format to arrays
		$data = (array) $data;
		$format = (array) $format;
		
		// Build format string
		$format = implode('', $format); 
		$format = str_replace('%', '', $format);		
		list( $fields, $placeholders, $values ) = $this->prep_query($data);		
		// Prepend $format onto $values
		array_unshift($values, $format); 
		// Prepary our query for binding
		$stmt = $db->prepare("INSERT INTO {$table} ({$fields}) VALUES ({$placeholders})");
		// Dynamically bind values
		call_user_func_array( array( $stmt, 'bind_param'), $this->ref_values($values));		
		// Execute the query
		$stmt->execute();		
		// Check for successful insertion
		if ( $stmt->affected_rows ) {
			return true;
		}		
		return false;
	}


	public function update($table, $data, $format, $where, $where_format) {
		// Check for $table or $data not set
		if ( empty( $table ) || empty( $data ) ) {
			return false;
		}
		
		// Connect to the database
		$db = $this->mysqli;		
		// Cast $data and $format to arrays
		$data = (array) $data;
		$format = (array) $format;
		
		// Build format array
		$format = implode('', $format); 
		$format = str_replace('%', '', $format);
		$where_format = implode('', $where_format); 
		$where_format = str_replace('%', '', $where_format);
		$format .= $where_format;		
		list( $fields, $placeholders, $values ) = $this->prep_query($data, 'update');	
		//Format where clause
		$where_clause = '';
		$where_values = '';
		$count = 0;		
			foreach ( $where as $field => $value ) {
				if ( $count > 0 ) {
					$where_clause .= ' AND ';
				}			
				$where_clause .= $field . '=?';
				$where_values[] = $value;			
				$count++;
			}
		// Prepend $format onto $values
		array_unshift($values, $format);
		$values = array_merge($values, $where_values);
		// Prepary our query for binding
		$stmt = $db->prepare("UPDATE {$table} SET {$placeholders} WHERE {$where_clause}");		
		// Dynamically bind values
		call_user_func_array( array( $stmt, 'bind_param'), $this->ref_values($values));		
		// Execute the query
		$stmt->execute();		
		// Check for successful insertion
		if ( $stmt->affected_rows ) {
			return true;
		}		
		return false;
	}


	public function select($query, $data, $format) {
		// Connect to the database
		$db = $this->mysqli;		
		//Prepare our query for binding
		$stmt = $db->prepare($query);		
		//Normalize format
		$format = implode('', $format); 
		$format = str_replace('%', '', $format);		
		// Prepend $format onto $values
		array_unshift($data, $format);		
		//Dynamically bind values
		call_user_func_array( array( $stmt, 'bind_param'), $this->ref_values($data));		
		//Execute the query
		$stmt->execute();		
		//Fetch results
		$result = $stmt->get_result();		
		//Create results object
		while ($row = $result->fetch_object()) {
			$results[] = $row;
		}
		return $results;
	}


	public function delete($table, $id) {
		// Connect to the database
		$db = $this->mysqli;		
		// Prepary our query for binding
		$stmt = $db->prepare("DELETE FROM {$table} WHERE ID = ?");		
		// Dynamically bind values
		$stmt->bind_param('d', $id);		
		// Execute the query
		$stmt->execute();		
		// Check for successful insertion
		if ( $stmt->affected_rows ) {
			return true;
		}
	}

	public function prep_query($data, $type='insert') {
		// Instantiate $fields and $placeholders for looping
		$fields = '';
		$placeholders = '';
		$values = array();		
		// Loop through $data and build $fields, $placeholders, and $values			
		foreach ( $data as $field => $value ) {
			$fields .= "{$field},";
			$values[] = $value;			
			if ( $type == 'update') {
				$placeholders .= $field . '=?,';
			} else {
				$placeholders .= '?,';
			}			
		}
		
		// Normalize $fields and $placeholders for inserting
		$fields = substr($fields, 0, -1);
		$placeholders = substr($placeholders, 0, -1);
		return array( $fields, $placeholders, $values );
	}

	public function ref_values($array) {
		$refs = array();
		foreach ($array as $key => $value) {
			$refs[$key] = &$array[$key]; 
		}
		return $refs; 
	}

}
$mydb = new myDBC();
?>