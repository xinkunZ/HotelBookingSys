package com.hotel.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotel.dao.MemberDao;
import com.hotel.entity.Member;

@Service
public class MemberService {

  @Autowired
  private MemberDao memberDao;

  @Transactional
  public void editPassword(String oldPassword, String newPassword, Member member) throws Exception {
    Member curMember = memberDao.getByUserName(member.getUserName());
    if (curMember.getPassword().equals(oldPassword)) {
      curMember.setPassword(newPassword);
      memberDao.save(curMember);
    } else {
      throw new Exception("原密码不正确");
    }
  }

  @Transactional
  public Member save(Member member) {
    return memberDao.save(member);
  }

  @Transactional
  public Member getByName(String userName) {
    return memberDao.getByUserName(userName);
  }

  @Transactional
  public Member getById(String id) {
    return memberDao.getById(id);
  }

  @Transactional
  public void delete(Member member) {
    memberDao.delete(member);
  }

  @Transactional
  public Member setMemberAmount(Member member, double curOrderSumAmount) {
    double oldAmount = member.getAmount();
    double newAmount = curOrderSumAmount + oldAmount;

    if (newAmount >= 200 && oldAmount < 200) {
      member.setNumberOfTicket(member.getNumberOfTicket() + 1);
    }
    if (newAmount >= 500 && oldAmount < 500) {
      member.setNumberOfTicket(member.getNumberOfTicket() + 2);
    }
    if (newAmount >= 1000 && oldAmount < 1000) {
      member.setNumberOfTicket(member.getNumberOfTicket() + 5);
    }
    member.setAmount(newAmount);
    return memberDao.save(member);
  }

}
