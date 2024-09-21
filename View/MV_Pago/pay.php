<?php
require_once("/SISTEMA_TIENDA/vista/MV_Pago/business/Payment.php");

extract($_REQUEST);

// Asegúrate de que todas las variables necesarias estén definidas
$oPayment = new Payment($conektaTokenId, $card, $name, $description, $total, $email);

if ($oPayment->pay()) {
    echo "1";
} else {
    echo $oPayment->error;
}

?>