
<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
require_once "controlador.php";
$db = db::getDBConnection();

$jsonUsuario = json_decode(file_get_contents("php://input"));
if (!$jsonUsuario) {
    exit("No hay datos");
}
$auth = false;
$answer = $db->GetUser($jsonUsuario->username, $jsonUsuario->password);
if (mysqli_num_rows($answer)>0){
	$auth = true;
} 
if($auth){
	//echo '{$answer:1}';
	$answer = mysqli_fetch_object($answer);
	echo json_encode(["answer"=>1,"name"=>$answer->name,"rol"=>$answer->rol, "id"=>$answer->id]);
}else{
	echo '{"answer":0}';
}

?>

