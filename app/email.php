<?

ini_set("SMTP", "localhost");
ini_set("smtp_port", "25");
ini_set("sendmail_from", "");

function clear($data){
	return trim(strip_tags($data));
}



if($_SERVER['REQUEST_METHOD'] == 'POST'){

	//urldecode()

	$to = clear($_POST['to']);
	$name = clear($_POST['name']);
	$email = clear($_POST['email']);
	$phone = clear($_POST['phone']);
	$from_msg = clear($_POST['message']);


	if( empty($email) || empty($to) || empty($from_msg) ){
		$status = "0";
	}else{
		
		$msg = "<p>Name: $name<br>Mail: $email<br>Phone: $phone<hr></p>\r\n";
		$msg .= "<p style='text-align: left; line-height: 20px;'>$from_msg</p>\r\n";
		$subject = "Связаться с нами"; 
		$subject = "=?utf-8?B?".base64_encode($subject)."?=";

		$header = "From: $email\r\n";
		$header .= "Reply-to: $email\r\n";
		$header .= "Date: ".date("d-m-Y",mktime())."\r\n";
		$header .= "Content-Type: text/html; charset='utf-8'\r\n";


		if( mail($to, $subject, $msg, $header) )
			$status = "1";//Ваше письмо успешно отправлено
		else
			$status = "2";//Письмо отправить не удалось
	}

	echo $status;
}
?>