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
        $answer = $db->SetItem(
            
            $jsonElemento->id_producto,
            $jsonElemento->id_pedido,
            $jsonElemento->estado,
            $jsonElemento->cantidad,
            $jsonElemento->comentario
        );
        break;
    case "pedido":
        $answer = $db->SetPedido(
            $jsonElemento->id_usuario,
            $jsonElemento->nombre_mesa,
            $jsonElemento->estado,
            $jsonElemento->valor
        );
        break;
    case "producto":
        $answer = $db->SetProducto(
            $jsonElemento->nombre,
            $jsonElemento->tipo,
            $jsonElemento->valor,
            $jsonElemento->foto,
            $jsonElemento->descripcion,
            $jsonElemento->disponibilidad 
        );
        break;

    case "usuario":
        $answer = $db->Setuser(
            $jsonElemento->username, 
            $jsonElemento->pass,
            $jsonElemento->name,
            $jsonElemento->rol
        );
        break;
    case "mesa":
        $answer = $db->SetMesa(
            $jsonElemento->nombre,
            $jsonElemento->disponibilidad,
            $jsonElemento->descripcion
        );
        break;
}
if($answer=="true"){
   // echo json_encode($answer);
   echo '{"answer":"ok"}';
}
else{
    echo json_encode($answer);
}


//************************ items********************* */
// $answer = $db->SetItem(
//     $jsonElemento->id_producto,
//     $jsonElemento->id_pedido,
//     $jsonElemento->comentario);

// //************************ pedidos********************* */
// $answer = $db->SetPedido(
//     $jsonElemento->id_usuario,
//     $jsonElemento->id_mesa,
//     $jsonElemento->estado,
//     $jsonElemento->valor);

//************************** Mesas ******************/
// $answer = $db->SetMesa(
//     $jsonElemento->nombre,
//     $jsonElemento->disponibilidad,
//     $jsonElemento->descripcion);

//************************ PRODUCTOS ********************* */
// $answer = $db->SetProducto(
//     $jsonElemento->nombre,
//     $jsonElemento->valor,
//     $jsonElemento->foto,
//     $jsonElemento->descripcion,
//     $jsonElemento->disponibilidad);

//****************** Usuarios **************** */

// $answer = $db->Setuser(
//     $jsonElemento->username, 
//     $jsonElemento->pass,
//     $jsonElemento->name,
//     $jsonElemento->rol);

// if ($answer){
// 	echo '{"bien":8}';
// }
// else{
//     echo '{"Mal":8}';
// }
?>