<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
require_once "controlador.php";
$db = db::getDBConnection();

$jsonElemento = json_decode(file_get_contents("php://input"));
if (!$jsonElemento) {
    exit("No hay datos");
}
switch($jsonElemento->table){
    case "item":
        $answer = $db->DeleteItem($jsonElemento->id_producto);
        break;
    case "pedido":
        $answer = $db->DeletePedido($jsonElemento->nombre_mesa);
        break;
    case "producto":
        $answer = $db->DeleteProducto($jsonElemento->nombre);
        break;
    case "usuario":
        $answer = $db->DeleteUser($jsonElemento->username);
        break;
    case "mesa":
        $answer = $db->DeleteMesa($jsonElemento->nombre);
        break;
}
if($answer=="true"){
    echo '{"answer":"ok"}';
}
else{
    echo '{"answer":"error"}';
}
//$answer = $db->DeleteItem($jsonElemento->id);
//$answer = $db->DeletePedido($jsonElemento->id_mesa);
//$answer = $db->DeleteUser($jsonElemento->username);
//$answer = $db->Deletemesa($jsonElemento->nombre);
?>