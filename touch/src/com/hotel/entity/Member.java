package com.hotel.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * @author L <br>
 *         uuid 唯一id <br>
 *         userName 用户名 <br>
 *         password 密码 <br>
 *         birthday 出生日期<br>
 *         email 邮箱<br>
 *         phone 手机号码 <br>
 *         regTime 注册日期<br>
 *         amount 累计消费金额<br>
 *         numberOfTicket 优惠券数量<br>
 */
@Entity
@Table(name = "member")
public class Member implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String uuid;
  private String userName;
  private String password;
  private Date birthday;
  private String gender;
  private String email;
  private String phone;
  private Date regTime;
  private double amount;
  private int numberOfTicket;
  @JsonIgnore
  private List<Subscription> subscriptions;

  @Id
  @Column(length = 38, nullable = false)
  @GeneratedValue(generator = "member-uuid")
  @GenericGenerator(name = "member-uuid", strategy = "uuid")
  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public Date getRegTime() {
    return regTime;
  }

  public void setRegTime(Date regTime) {
    this.regTime = regTime;
  }

  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public double getAmount() {
    return amount;
  }

  public void setAmount(double amount) {
    this.amount = amount;
  }

  public int getNumberOfTicket() {
    return numberOfTicket;
  }

  public void setNumberOfTicket(int numberOfTicket) {
    this.numberOfTicket = numberOfTicket;
  }

  @OneToMany(mappedBy = "member")
  @JoinColumn(name = "memberId")
  public List<Subscription> getSubscriptions() {
    return subscriptions;
  }

  public void setSubscriptions(List<Subscription> subscriptions) {
    this.subscriptions = subscriptions;
  }

}
