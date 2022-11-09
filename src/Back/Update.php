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
        switch($jsonElemento->query){
            case "several":
                $answer = $db->UpdateItem_estado($jsonElemento->id_pedido,$jsonElemento->estado);
                break;
            case "only":
                $answer = $db->UpdateItem(
                $jsonElemento->id,
                $jsonElemento->id_producto,
                $jsonElemento->id_pedido,
                $jsonElemento->estado,
                $jsonElemento->valor,
                $jsonElemento->comentario
                );
                break;
        }
        
        break;
    case "pedido":
        $answer = $db->UpdatePedido(
                $jsonElemento->id,
                $jsonElemento->id_usuario,
                $jsonElemento->nombre_mesa,
                $jsonElemento->estado,
                $jsonElemento->valor
            );
        break;
    case "producto":
        $answer = $db->UpdateProducto(
                $jsonElemento->id,
                $jsonElemento->nombre,
                $jsonElemento->tipo,
                $jsonElemento->valor,
                $jsonElemento->foto,
                $jsonElemento->descripcion,
                $jsonElemento->disponibilidad
            );
        break;

    case "usuario":
        $answer = $db->UpdateUser(
            $jsonElemento->id,
            $jsonElemento->username, 
            $jsonElemento->pass,
            $jsonElemento->name,
            $jsonElemento->rol
        );
        break;
    case "mesa":
        $answer = $db->UpdateMesa(
            $jsonElemento->id,
            $jsonElemento->nombre,
            $jsonElemento->disponibilidad,
            $jsonElemento->descripcion
        );
        break;
}
if($answer>0){
    echo '{"answer":"ok"}';
}
else{
    echo '{"answer":"error"}';
}

//************************ items********************* */
// $answer = $db->UpdateItem(
//     $jsonElemento->id
//     $jsonElemento->id_producto,
//     $jsonElemento->id_pedido,
//     $jsonElemento->comentario);

// //************************ pedidos********************* */
// $answer = $db->UpdatePedido(
//     $jsonElemento->id,
//     $jsonElemento->id_usuario,
//     $jsonElemento->id_mesa,
//     $jsonElemento->estado,
//     $jsonElemento->valor);

// //************************** Mesas **********************/

// $answer = $db->UpdateMesa(
//     $jsonElemento->id,
//     $jsonElemento->nombre,
//     $jsonElemento->disponibilidad,
//     $jsonElemento->descripcion);

/*************** Producto *******************/
// $answer = $db->UpdateProducto(
//     $jsonElemento->id,
//     $jsonElemento->nombre,
//     $jsonElemento->valor,
//     $jsonElemento->foto,
//     $jsonElemento->descripcion,
//     $jsonElemento->disponibilidad);
?>