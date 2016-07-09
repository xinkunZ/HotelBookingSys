package com.hotel.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hd123.lab.ext.type.ExtResponse;
import com.hotel.convert.RegistInfo2Member;
import com.hotel.entity.Member;
import com.hotel.pageform.RegistInfo;
import com.hotel.service.MemberService;

@Controller
@RequestMapping(value = "member", produces = "application/json;charset=utf-8")
public class MemberController {
  @Autowired
  MemberService memberService;

  @RequestMapping(value = "/check")
  public @ResponseBody ExtResponse checkLogin(HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    if (session.getAttribute("member") != null) {
      rsp.setData(Boolean.TRUE);
    } else {
      rsp.setData(Boolean.FALSE);
    }
    return rsp;
  }

  @RequestMapping(value = "/regist")
  public @ResponseBody ExtResponse regist(@RequestBody RegistInfo bMember) {
    ExtResponse rsp = new ExtResponse();
    RegistInfo2Member convert = new RegistInfo2Member();
    Member member = convert.convert(bMember);
    if (memberService.getByName(member.getUserName()) == null) {
      memberService.save(member);
    } else {
      List<String> msg = new ArrayList<String>();
      msg.add("该账号已存在！");
      rsp.setSuccess(Boolean.FALSE);
    }

    return rsp;
  }

  @RequestMapping(value = "/login")
  public @ResponseBody ExtResponse login(@RequestParam(value = "userName") String userName,
      @RequestParam(value = "password") String password, HttpSession session) {
    ExtResponse rsp = new ExtResponse();

    Member member = memberService.getByName(userName);
    if (member != null) {
      if (password.equals(member.getPassword())) {
        session.setAttribute("member", member);
      } else {
        List<String> msg = new ArrayList<String>();
        msg.add("账号密码错误");
        rsp.setMessage(msg);
        rsp.setSuccess(Boolean.FALSE);
      }
    } else {
      List<String> msg = new ArrayList<String>();
      msg.add("用户不存在");
      rsp.setMessage(msg);
      rsp.setSuccess(Boolean.FALSE);
    }
    return rsp;
  }

  @RequestMapping(value = "/logout")
  public @ResponseBody ExtResponse logout(HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    session.removeAttribute("member");
    return rsp;
  }

  @RequestMapping(value = "/get")
  public @ResponseBody ExtResponse getMemberInfo(HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    Member curMember = (Member) session.getAttribute("member");
    Member memberInfo = memberService.getById(curMember.getUuid());
    rsp.setData(memberInfo);
    return rsp;
  }

  @RequestMapping(value = "/editpass")
  public @ResponseBody ExtResponse editPassword(@RequestParam(value = "oldPassword") String oldPassword,
      @RequestParam(value = "newPassword") String newPassword, HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    Member member = (Member) session.getAttribute("member");
    try {
      memberService.editPassword(oldPassword, newPassword, member);
      rsp.setSuccess(Boolean.TRUE);
      return rsp;
    } catch (Exception e) {
      rsp.setSuccess(Boolean.FALSE);
      List<String> msg = new ArrayList<String>();
      msg.add(e.getMessage());
      rsp.setMessage(msg);
      return rsp;
    }
  }

  @RequestMapping(value = "/ticket")
  public @ResponseBody ExtResponse getNumberOfTicket(HttpSession session) {
    ExtResponse rsp = new ExtResponse();
    Member curMember = (Member) session.getAttribute("member");
    Member member = memberService.getByName(curMember.getUserName());
    int number = member.getNumberOfTicket();
    rsp.setData(new Integer(number));
    return rsp;
  }

}
