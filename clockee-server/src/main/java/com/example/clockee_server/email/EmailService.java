package com.example.clockee_server.email;

import com.example.clockee_server.message.AppMessage;
import com.example.clockee_server.message.MessageKey;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
  private final JavaMailSender sender;

  public void sendHtmlMessage(List<String> to, String subject, String htmlBody) {
    try {
      MimeMessage message = sender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
      helper.setTo(to.toArray(new String[0]));
      helper.setSubject(subject);
      helper.setText(htmlBody, true);
      sender.send(message);
    } catch (MessagingException e) {
      throw new RuntimeException(AppMessage.of(MessageKey.UNABLE_SENT_EMAIL), e);
    } catch (MailSendException e) {
      throw new RuntimeException(AppMessage.of(MessageKey.EMAIL_SERVICE_NOT_AVAIABLE), e);
    }
  }

  public void sendSimpleEmail(List<String> to, String subject, String content) {
    try {
      log.info("Sending email to: {}", to);
      SimpleMailMessage message = new SimpleMailMessage();
      message.setTo(to.toArray(new String[0]));
      message.setSubject(subject);
      message.setText(content);
      sender.send(message);
    } catch (MailSendException e) {
      throw new RuntimeException(AppMessage.of(MessageKey.EMAIL_SERVICE_NOT_AVAIABLE), e);
    }
  }
}
