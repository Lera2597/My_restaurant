<?php
define("HOST","localhost");
define("USER","root");
define("PASS","");
define("PORT","3306");
define("DBNAME","db_proyectofinal");

class DB extends mysqli{
	protected static $instance;

	public function __constructor($host,$user,$pass,$dbname,$port){
		@parent::__constructor($host,$user,$pass,$dbname,$port);
		if(mysqli_connect_errno()){
			throw new Exception("error de conexion", 1);
		}
	}

	public static function getDBConnection(){
		if(!self::$instance){
			try{
				self::$instance = new self(HOST,USER,PASS,DBNAME,PORT);
				$consulta = "SET CHARACTER SET UTF8";
				self::$instance->query($consulta);
			}
			catch (Exception $e) {
				echo 'Caught exceptionnn: ',  $e->getMessage(), "\n";
			}
			
		}
		return self::$instance;
	}
	//**************************** Usuarisos   ******************/
	public function GetUser($username, $password){
		$consulta = "SELECT * FROM usuarios WHERE username='".$username."' AND password='".$password."'";
		return $this->query($consulta);
	}
	public function GetAllUsers(){
		$consulta = "SELECT * FROM usuarios ";
		return $this->query($consulta);
	}
	public function Setuser($username, $password,$name,$rol){
		$consulta = "SELECT * FROM usuarios WHERE username='".$username."'";
		$col = $this->Setvalidation($consulta);
		if($col){// Cosuslta si el usuario ya existe
			return false;// Usuario ya existe
		}
		else{
			$consulta = "INSERT INTO usuarios (id, username, password, name,rol) VALUES 
			(Null, '".$username."', '".$password."', '".$name."',$rol)";
		 	return $this->query($consulta);
		}
				
	}
	public function UpdateUser($id,$username, $password,$name,$rol){
		$consulta = "UPDATE usuarios SET 
		username = '$username',password = '$password',name = '$name',rol = $rol
		WHERE usuarios.id = $id";
		return $this->query($consulta);
	}
	public function DeleteUser($username){
		$consulta = "DELETE FROM usuarios WHERE usuarios.username = '$username'";
		return $this->query($consulta);
	}

	//**************************** Productos  ********************/
	public function GetProducto($nombre){
		$consulta = "SELECT * FROM productos WHERE nombre='".$nombre."'";
		return $this->query($consulta);
	}
	public function GetAllProductos(){
		$consulta = "SELECT * FROM productos ";
		return $this->query($consulta);
	}

	public function SetProducto($nombre,$valor,$foto,$descripcion,$disponibilidad){
		$consulta = "INSERT INTO productos (id, nombre,valor,foto,descripcion,disponibilidad) VALUES 
		(Null,'".$nombre."', $valor,'".$foto."','".$descripcion."', $disponibilidad)";
		return $this->query($consulta);
	}
	public function UpdateProducto($id,$nombre,$valor,$foto,$descripcion,$disponibilidad){
		$consulta = "UPDATE productos SET 
		nombre = '$nombre',valor = $valor,foto = '$foto',descripcion = '$descripcion',disponibilidad = $disponibilidad 
		WHERE productos.id = $id";
		return $this->query($consulta);
	}
	public function DeleteProducto($nombre){
		$consulta = "DELETE FROM productos WHERE productos.nombre = '$nombre'";
		return $this->query($consulta);
	}
	//*********************************** Mesas *********************************************//
	public function GetMesa($nombre){
		$consulta = "SELECT * FROM 	mesas WHERE nombre = '".$nombre."'";
		return $this->query($consulta);
	}
	public function GetAllMesas(){
		$consulta = "SELECT * FROM mesas ";
		return $this->query($consulta);
	}
	public function SetMesa($nombre,$disponibilidad,$descripcion){
		$consulta = "INSERT INTO mesas (id, nombre,disponibilidad,descripcion) VALUES 
		(Null,'".$nombre."', $disponibilidad,'".$descripcion."')";
		return $this->query($consulta);		
	}
	public function UpdateMesa($id,$nombre,$disponibilidad,$descripcion){
		$consulta = "UPDATE mesas SET
		nombre = '$nombre',disponibilidad = $disponibilidad ,descripcion = '$descripcion' 
		WHERE mesas.id = $id";
		return $this->query($consulta);		
	}
	public function DeleteMesa($nombre){
		$consulta = "DELETE FROM mesas WHERE mesas.nombre = '$nombre'";
		return $this->query($consulta);
	}

	//*********************************** Pedidos *********************************************//
	public function GetPedido($nombre_mesa){
		$consulta = "SELECT * FROM 	pedidos WHERE nombre_mesa = '".$nombre_mesa."'";
		return $this->query($consulta);
	}
	public function GetAllPedidos(){
		$consulta = "SELECT * FROM pedidos ";
		return $this->query($consulta);
	}
	public function SetPedido($id_usuario,$nombre_mesa,$estado,$valor){
		$consulta = "INSERT INTO pedidos (id, id_usuario,nombre_mesa,estado,valor) VALUES 
		(Null,$id_usuario, '".$nombre_mesa."',$estado,$valor)";
		return $this->query($consulta);		
	}
	public function UpdatePedido($id,$id_usuario,$nombre_mesa,$estado,$valor){
		$consulta = "UPDATE pedidos SET
		id_usuario = $id_usuario,nombre_mesa = '".$nombre_mesa."',estado = $estado,valor = $valor 
		WHERE pedidos.id = $id";
		return $this->query($consulta);		
	}
	public function DeletePedido($nombre_mesa){
		$consulta = "DELETE FROM pedidos WHERE pedidos.nombre_mesa = $nombre_mesa";
		return $this->query($consulta);
	}
	//*********************************** Items *********************************************//
	public function GetItem($nombre_producto){
		$consulta = "SELECT * FROM 	items WHERE nombre_producto = '".$nombre_producto."'";
		return $this->query($consulta);
	}
	public function GetAllItems(){
		$consulta = "SELECT * FROM items ";
		return $this->query($consulta);
	}
	public function GetPartItem($id_pedido){
		$consulta = "SELECT * FROM 	items WHERE id_pedido = '".$id_pedido."'";
		return $this->query($consulta);
	}

	public function SetItem($id_producto,$id_pedido,$estado,$cantidad,$comentario){
		
		$consulta = "INSERT INTO items (id, nombre_producto,id_pedido,estado,cantidad,comentario) VALUES 
		(Null,'".$id_producto."', $id_pedido,$estado,$cantidad,'".$comentario."')";
		return $this->query($consulta);		
	}
	public function UpdateItem($id,$id_producto,$id_pedido,$estado,$valor,$comentario){
		$consulta = "UPDATE items SET
		id_producto = $id_producto,
		id_pedido = $id_pedido,
		estado = $estado,
		valor = $valor,
		comentario = '$comentario'
		WHERE items.id = $id";
		return $this->query($consulta);		
	}
	public function UpdateItem_estado($id_pedido,$estado){
		$consulta = "UPDATE items SET
		estado = $estado
		WHERE items.id_pedido = $id_pedido";
		//return 5;
		return $this->query($consulta);	
		//UPDATE `items` SET `estado` = '0' WHERE `items`.`id_pedido` = 5;	
	}

	
	public function DeleteItem($id){
		$consulta = "DELETE FROM items WHERE items.id = $id";
		return $this->query($consulta);
	}
	public function Setvalidation($consulta){
		$query = $this->query($consulta);
		if (mysqli_num_rows($query) > 0) {
			return true;
		}
		else{
			return false;
		}
	}

}

?>

