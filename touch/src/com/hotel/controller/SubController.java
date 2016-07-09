package com.hotel.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.entity.Member;
import com.hotel.entity.Subscription;
import com.hotel.service.MemberService;
import com.hotel.service.SubscriptionService;

@Controller
@RequestMapping(value = "sub", produces = "application/json;charset=utf-8")
public class SubController {
  @Autowired
  private SubscriptionService subscriptionService;
  @Autowired
  private MemberService memberService;

  @RequestMapping(value = "/create")
  public @ResponseBody ExtResponse createSub(@RequestBody Subscription subscription, HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    Member loginMember = (Member) session.getAttribute("member");
    Member member = memberService.getById(loginMember.getUuid());
    subscription.setMember(member);
    Subscription result = subscriptionService.save(subscription);
    memberService.setMemberAmount(member, subscription.getAmount());
    rsp.setData(result.getOrderNo());
    return rsp;
  }

  @RequestMapping(value = "/get")
  public @ResponseBody ExtResponse getSub(@RequestParam(value = "orderNo") String orderNo) {
    ExtResponse rsp = new ExtResponse();
    Subscription subscription = subscriptionService.getSubByNo(orderNo);
    rsp.setData(subscription);
    return rsp;
  }

  @RequestMapping(value = "/list")
  public @ResponseBody ExtResponse getSubList(HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    Member member = (Member) session.getAttribute("member");
    List<Subscription> result = subscriptionService.getSubListByMember(member.getUuid());
    rsp.setData(result);
    return rsp;
  }
}
