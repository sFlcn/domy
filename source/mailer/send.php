<?php
require "phpmailer/PHPMailer.php";
require "phpmailer/SMTP.php";
require "phpmailer/Exception.php";

if (!error_get_last()) {

    $subj = trim(htmlspecialchars($_POST["form-subject"]));
    $name = trim(htmlspecialchars($_POST["form-name"]));
    $email = trim(htmlspecialchars($_POST["form-cntctml"]));
    $tel = trim(htmlspecialchars($_POST["form-cntctfn"]));
    $qhouse = trim(htmlspecialchars($_POST["quiz_house"]));
    $qhelp = trim(htmlspecialchars($_POST["quiz_help"]));
    $qtime = trim(htmlspecialchars($_POST["quiz_time"]));
    $qcontact = trim(htmlspecialchars($_POST["quiz_contact"]));

    $honeypot1 = trim(htmlspecialchars($_POST["email"]));
    $honeypot2 = trim(htmlspecialchars($_POST["phone"]));

    $validating = true;
    $emailvalidating = true;
    $telvalidating = true;

    $data["result"] = "";
    $data["info"] = "";
    $data["desc"] = "";

    if ($email == "") {
      $emailvalidating = false;
      $data["result"] = "error";
      $data["info"] = "Сообщение не было отправлено.";
      $data["desc"] = $data["desc"]."Некорректные данные почты. ";
    } else {
      $email = filter_var($email, FILTER_SANITIZE_EMAIL);
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $emailvalidating = false;
        $data["result"] = "error";
        $data["info"] = "Сообщение не было отправлено.";
        $data["desc"] = $data["desc"]."Некорректные данные почты. ";
      }
    }

    if ($tel == "") {
      $telvalidating = false;
      $data["result"] = "error";
      $data["info"] = "Сообщение не было отправлено.";
      $data["desc"] = $data["desc"]."Некорректные данные телефона. ";
    }

    if ($qhouse == "") {
      $qhouse = " ";
    } else {
      $qhouse = $qhouse.' м²';
    }

    if ($qhelp == "yes") {
      $qhelp = "требуется";
    } elseif ($qhelp == "no") {
      $qhelp = "НЕ потребуется";
    } else {
      $qhelp = "не указано";
    }

    if ($qtime == "month") {
      $qtime = "1 месяц";
    } elseif ($qtime == "3month") {
      $qtime = "3 месяца";
    } elseif ($qtime == "halfyear") {
      $qtime = "полгода";
    } elseif ($qtime == "na") {
      $qtime = "пока прицениваюсь";
    } else {
      $qtime = "срок не определён";
    }

    if ($qcontact == "") {
      $qcontact = "не указан";
    }

    if ( $honeypot1 != "" || $honeypot2 != "" ) {
      $validating = false;
      $data["result"] = "error";
      $data["info"] = "Сообщение не было отправлено.";
      $data["desc"] = $data["desc"]."Подозрительная активность. ";
    }

    if ( $emailvalidating == false && $telvalidating == false ) {
      $validating = false;
    }

    date_default_timezone_set("Europe/Moscow");
    $monthsRu = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    $dateTimeMsk = $monthsRu[date("n")-1].' '.date('d, Y').' - '.date('H:i:s');

    $title = "Domycompany.ru — ".$subj;
    $body = "
    <table>
      <tbody>
        <tr>
          <th colspan='2'>Заявка с сайта: $subj</th>
        </tr>
        <tr>
          <td>Имя: </td>
          <td>$name</td>
        </tr>
        <tr>
          <td>Телефон: </td>
          <td>$tel</td>
        </tr>
        <tr>
          <td>E-mail: </td>
          <td>$email</td>
        </tr>
        <tr>
          <td>Тип дома: </td>
          <td>$qhouse</td>
        </tr>
        <tr>
          <td>Помощь с подбором участка: </td>
          <td>$qhelp</td>
        </tr>
        <tr>
          <td>Срок: </td>
          <td>$qtime</td>
        </tr>
        <tr>
          <td>Предпочтительный мессенджер: </td>
          <td>$qcontact</td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <p>
      <small>$dateTimeMsk</small>
      <br>
      <img src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRkZGMDAwIi8+CjxwYXRoIGQ9Ik0xNyA0NkgyNi44NTg3QzMzLjYzNjUgNDYgMzguODUwMyA1MC4wNzYyIDM4Ljg1MDMgNTYuOTAxNEMzOC44NTAzIDYzLjcyNjcgMzMuNjM2NSA2Ny44NTAzIDI2Ljg1ODcgNjcuODUwM0gxN1Y0NlpNMjIuNjg3NyA1MC45NzY3VjYyLjg3MzVIMjYuODU4N0MzMC40MTM1IDYyLjg3MzUgMzMuMDIwNCA2MC43NDA2IDMzLjAyMDQgNTYuOTAxNEMzMy4wMjA0IDUzLjA2MjIgMzAuNDEzNSA1MC45NzY3IDI2Ljg1ODcgNTAuOTc2N0gyMi42ODc3WiIgZmlsbD0iIzFDMUMxQiIvPgo8cGF0aCBkPSJNMzkuNTEzOSA1OS40MTM1QzM5LjUxMzkgNTQuMDU3NiA0My40NDc4IDUwLjU5NzYgNDguODAzOCA1MC41OTc2QzU0LjE1OTcgNTAuNTk3NiA1OC4wOTM3IDU0LjAxMDIgNTguMDkzNyA1OS40MTM1QzU4LjA5MzcgNjQuNzY5NCA1NC4xNTk3IDY4LjIyOTUgNDguODAzOCA2OC4yMjk1QzQzLjQ0NzggNjguMjI5NSAzOS41MTM5IDY0LjgxNjggMzkuNTEzOSA1OS40MTM1Wk00NS4yMDE2IDU5LjQxMzVDNDUuMjAxNiA2MS41OTM4IDQ2LjYyMzUgNjIuOTIwOSA0OC43NTY0IDYyLjkyMDlDNTAuODg5MyA2Mi45MjA5IDUyLjMxMTIgNjEuNTkzOCA1Mi4zMTEyIDU5LjQxMzVDNTIuMzExMiA1Ny4yMzMyIDUwLjg4OTMgNTUuOTA2MSA0OC43NTY0IDU1LjkwNjFDNDYuNjIzNSA1NS45MDYxIDQ1LjIwMTYgNTcuMjMzMiA0NS4yMDE2IDU5LjQxMzVaIiBmaWxsPSIjMUMxQzFCIi8+CjxwYXRoIGQ9Ik01OC44OTk0IDUxLjAyNDFINjQuNTM5OFY1Mi42ODMxQzY1LjYyOTkgNTEuNDAzMyA2Ny4wNTE4IDUwLjY0NSA2OC43NTgxIDUwLjY0NUM3MS4xMjggNTAuNjQ1IDcyLjY0NDcgNTEuNjg3NyA3My41NDUzIDUzLjI5OTJDNzQuNzMwMiA1MS42NDAzIDc2LjQ4MzkgNTAuNjQ1IDc4LjUyMiA1MC42NDVDODMuMTY3IDUwLjY0NSA4NC44MjU5IDU0LjI5NDYgODQuODI1OSA1OC42NTUxVjY3Ljg1MDNINzkuMjMzVjU4Ljg5MjFDNzkuMjMzIDU3LjIzMzIgNzguNDI3MiA1NS45NTM1IDc3LjEwMDEgNTUuOTUzNUM3NS41ODM0IDU1Ljk1MzUgNzQuNjgyOCA1Ny4wOTEgNzQuNjgyOCA1OS4xMjkxVjY3Ljg1MDNINjkuMDg5OVY1OC44OTIxQzY5LjA4OTkgNTcuMjMzMiA2OC4yODQyIDU1Ljk1MzUgNjYuOTU3IDU1Ljk1MzVDNjUuNTM1MSA1NS45NTM1IDY0LjUzOTggNTYuOTk2MiA2NC41Mzk4IDU4Ljc5NzNWNjcuODUwM0g1OC44OTk0VjUxLjAyNDFaIiBmaWxsPSIjMUMxQzFCIi8+CjxwYXRoIGQ9Ik04OS44NSA1MS4wMjQxTDkzLjU0NzEgNjAuNzg4SDkzLjczNjZMOTcuMTk2NyA1MS4wMjQxSDEwMi42VjUyLjExNDNMOTYuNTMzMSA2Ny44OTc3Qzk1LjIwNiA3MS4zMTAzIDkzLjQ1MjMgNzMuMzk1OCA4Ny40ODAyIDczLjM5NThWNjcuOTkyNUM4OC43NTk5IDY3Ljk5MjUgODkuNjEzMSA2Ny45NDUxIDkwLjE4MTggNjcuNzA4MUw4NC4wMjAxIDUyLjExNDNWNTEuMDI0MUg4OS44NVoiIGZpbGw9IiMxQzFDMUIiLz4KPC9zdmc+Cg==' />
    </p>
    ";

    $mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS["data"]["debug"][] = $str;};

    include "phpmailer/keys.php";

    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    if ($validating == true) {
      if ($mail->send()) {
          $data["result"] = "success";
          $data["info"] = "Сообщение успешно отправлено!";
      } else {
          $data["result"] = "error";
          $data["info"] = "Сообщение не было отправлено. Ошибка при отправке письма";
          $data["desc"] = "Причина ошибки: {$mail->ErrorInfo}";
      }
    }


} else {
    $data["result"] = "error";
    $data["info"] = "В коде присутствует ошибка";
    $data["desc"] = error_get_last();
}

header("Content-Type: application/json");
echo json_encode($data);

?>
