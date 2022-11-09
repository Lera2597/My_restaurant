<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: *");
require_once "controlador.php";
$db = db::getDBConnection();

$jsonElemento = json_decode(file_get_contents("php://input"));
$arrayElementos =array();

if (!$jsonElemento) {
    exit("No hay datos");
}

switch($jsonElemento->query){
    case "only":
        switch($jsonElemento->table){
            case "item":
                $answer = $db->GetItem($jsonElemento->nombre_producto);
                break;
            case "pedido":
                $answer = $db->GetPedido($jsonElemento->nombre_mesa);
                break;
            case "producto":
                $answer = $db->GetProducto($jsonElemento->name);
                break;
        
            case "usuario":
                $answer = $db->GetUser($jsonElemento->username);
                break;
            case "mesa":
                $answer = $db->GetMesa($jsonElemento->name);
                break;
        }
        if($answer=="false"){
            echo '';//no se encontro el dato en la tabla
        }
        else{
            echo json_encode(mysqli_fetch_array($answer,MYSQLI_ASSOC));//Retorna un objeto con los campos y valores en estring
        }
        break;
    case "all":
        switch($jsonElemento->table){
            case "item":
                $answer = $db->GetAllItems();
                break;
            case "pedido":
                $answer = $db->GetAllPedidos();
                break;
            case "producto":
                $answer = $db->GetAllProductos();
                break;    
            case "usuario":
                $answer = $db->GetAllUsers();
                break;
            case "mesa":
                $answer = $db->GetAllMesas();
                break;
        }
        if($answer=="false"){
            echo '';//no se encontro el dato en la tabla
        }
        else{
            while ($Elemento = $answer->fetch_assoc()) { //itera sobre cada elemento extraido de la tabla 
                $arrayElementos[] = $Elemento;
            }
            //unset($arrayElementos[0]);//elimina el primer elemento del array. es un elemento no deseado
            echo json_encode($arrayElementos);//Retorna un objeto con los campos y valores en estring      
        }      
        break;
    case "part":
        switch($jsonElemento->table){
            case "item":
                $answer = $db->GetPartItems($jsonElemento->id_pedido);
                break;
        }
        if($answer=="false"){
            echo '';//no se encontro el dato en la tabla
        }
        else{
            while ($Elemento = $answer->fetch_assoc()) { //itera sobre cada elemento extraido de la tabla 
                $arrayElementos[] = $Elemento;
            }
            //unset($arrayElementos[0]);//elimina el primer elemento del array. es un elemento no deseado
            echo json_encode($arrayElementos);//Retorna un objeto con los campos y valores en estring      
        }
        break;
        
}


//echo json_encode(mysqli_fetch_array($answer, MYSQLI_BOTH));//Retorna Ambas opciones anteriores
//echo json_encode([mysqli_fetch_row($answer)]);//Retorna todos los valores de cada campo en string
//echo json_encode($jsonElemento->query);
//echo '{"answer":0}';
//*********************** Items ***********************/
//$answer = $db->GetItem($jsonElemento->id);
//echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna un objeto con los campos y valores en estring

// //*********************** Pedidos ***********************/
// $answer = $db->GetPedido($jsonElemento->id_mesa);
// echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna un objeto con los campos y valores en estring

//********************** Mesas *******************/
// $answer = $db->GetMesa($jsonElemento->nombre);
// echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna un objeto con los campos y valores en estring

//*********************** Productos ***********************/
// $answer = $db->GetProducto($jsonElemento->nombre);
// echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna un objeto con los campos y valores en estring

// //************************* Usuarios ************** */
// $answer = $db->GetUser($jsonElemento->username, $jsonElemento->pass);
// echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna un objeto con los campos y valores en estring


//******************************************************** */
// $datos = mysqli_fetch_object($answer);
// echo json_encode([
// "Id"=> $datos->id,
// "Username"=> $datos->username,
// "Pass"=> $datos->password,
// "Name"=> $datos->name,
// "Rol"=> $datos->rol
// ]);


/////********************** */
// echo json_encode([mysqli_fetch_object($answer)]);
/////***************************** */
//echo json_encode([mysqli_fetch_row($answer)]);//Retorna todos los valores de cada campo en string
//echo json_encode([mysqli_fetch_array($answer,MYSQLI_ASSOC)]);//Retorna los campos y valores en estring
//echo json_encode([mysqli_fetch_array($answer,MYSQLI_NUM)]);//Retorna solo los valores de cada campo en string
//echo json_encode([mysqli_fetch_array($answer, MYSQLI_BOTH)]);//Retorna Ambas opciones anteriores
?>