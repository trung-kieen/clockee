package com.example.clockee_server.jobs;
import org.jobrunr.jobs.lambdas.JobRequest;
import org.jobrunr.jobs.lambdas.JobRequestHandler;

import com.example.clockee_server.jobs.handler.SendWelcomeEmailJobHandler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * SendWelcomeEmailJob
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SendWelcomeEmailJob implements JobRequest {
  private Long userId;


  @Override
  public Class<? extends JobRequestHandler> getJobRequestHandler() {
    return SendWelcomeEmailJobHandler.class;
  }


}
