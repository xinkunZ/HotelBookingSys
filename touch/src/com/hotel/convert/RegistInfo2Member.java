package com.hotel.convert;

import java.util.Date;

import com.hotel.entity.Member;
import com.hotel.pageform.RegistInfo;

public class RegistInfo2Member implements BaseConvert<RegistInfo, Member> {

  @Override
  public Member convert(RegistInfo source) {
    Member member = new Member();
    member.setAmount(0);
    member.setBirthday(source.getBirthday());
    member.setEmail(source.getEmail());
    member.setGender(source.getGender());
    member.setNumberOfTicket(0);
    member.setPassword(source.getPassword());
    member.setPhone(source.getPhone());
    member.setRegTime(new Date());
    member.setUserName(source.getUserName());
    return member;
  }
}
