<?php
require_once("bin/conekta-php-master/lib/Conekta.php");

class Payment {
    private $ApiKey = "key_u0hn7xlmG6nrmcAtvx4dAdI";
    private $ApiVersion = "2.0.0";

    private $UserDB = "root";
    private $PassDB = "";
    private $ServerDB = "localhost";
    private $DataBaseDB = "pagocurso";

    private $token;
    private $card;
    private $name;
    private $description;
    private $total;
    private $email;
    public $error;
    private $customer;
    private $order;
    public $order_number;

    public function __construct($token, $card, $name, $description, $total, $email) {
        $this->token = $token;
        $this->card = $card;
        $this->name = $name;
        $this->description = $description;
        $this->total = $total;
        $this->email = $email;
    }

    public function pay() {
        \Conekta\Conekta::setApiKey($this->ApiKey);
        \Conekta\Conekta::setApiVersion($this->ApiVersion);

        if (!$this->validate()) {
            return false;
        }

        if (!$this->createCustomer()) {
            return false;
        }

        if (!$this->createOrder()) {
            return false;
        }

        $this->save();

        return true;
    }

    private function save() {
        $link = new PDO("mysql:host=".$this->ServerDB.";dbname=".$this->DataBaseDB, $this->UserDB, $this->PassDB);

        $statement = $link->prepare("INSERT INTO payment (total, date_created, description, name, number_card, email, order_id)
            VALUES (:total, now(), :description, :name, :number_card, :email, :order_id)");

        $statement->execute([
            'total' => $this->total,
            'description' => $this->description,
            'name' => utf8_decode($this->name),
            'number_card' => substr($this->card, -4),
            'email' => $this->email,
            'order_id' => $this->order->id
        ]);

        $this->order_number = $link->lastInsertId();
    }

    private function createOrder() {
        try {
            $this->order = \Conekta\Order::create([
                "line_items" => [[
                    "name" => $this->description,
                    "unit_price" => $this->total * 100, // se multiplica por 100 en Conekta
                    "quantity" => 1
                ]],
                "currency" => "MXN",
                "customer_info" => [
                    "customer_id" => $this->customer->id
                ],
                "charges" => [[
                    "payment_method" => [
                        "type" => "default"
                    ]
                ]]
            ]);
        } catch (\Conekta\ProcessingError $error) {
            $this->error = $error->getMessage();
            return false;
        } catch (\Conekta\ParameterValidationError $error) {
            $this->error = $error->getMessage();
            return false;
        } catch (\Conekta\Handler $error) {
            $this->error = $error->getMessage();
            return false;
        }

        return true;
    }

    private function createCustomer() {
        try {
            $this->customer = \Conekta\Customer::create([
                "name" => $this->name,
                "email" => $this->email,
                "payment_sources" => [[
                    "type" => "card",
                    "token_id" => $this->token
                ]]
            ]);
        } catch (\Conekta\ProcessingError $error) {
            $this->error = $error->getMessage();
            return false;
        } catch (\Conekta\ParameterValidationError $error) {
            $this->error = $error->getMessage();
            return false;
        } catch (\Conekta\Handler $error) {
            $this->error = $error->getMessage();
            return false;
        }

        return true;
    }

    private function validate() {
        if ($this->card == "" || $this->name == "" || $this->description == "" || $this->total == "" || $this->email == "") {
            $this->error = "El número de tarjeta, el nombre, concepto, monto y correo electrónico son obligatorios";
            return false;
        }

        if (strlen($this->card) <= 14) {
            $this->error = "El número de tarjeta debe tener al menos 15 caracteres";
            return false;
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->error = "El correo electrónico no tiene un formato de correo válido";
            return false;
        }

        if ($this->total <= 20) {
            $this->error = "El monto debe ser mayor a 20 pesos";
            return false;
        }

        return true;
    }
}
?>
