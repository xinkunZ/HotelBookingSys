package com.hotel.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

/**
 * @author L <br>
 *         uuid 唯一id <br>
 *         category 房间类型 <br>
 *         roomNo 房间编号 <br>
 */
@Entity
@Table(name = "room")
public class Room implements Serializable {
  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String uuid;
  private Category category;
  private String roomNo;

  @Id
  @Column(length = 38, nullable = false)
  @GeneratedValue(generator = "room-uuid")
  @GenericGenerator(name = "room-uuid", strategy = "uuid")
  public String getUuid() {
    return uuid;
  }

  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  @OneToOne(targetEntity = Category.class)
  @JoinColumn(name = "cateId")
  public Category getCategory() {
    return category;
  }

  public void setCategory(Category category) {
    this.category = category;
  }

  public String getRoomNo() {
    return roomNo;
  }

  public void setRoomNo(String roomNo) {
    this.roomNo = roomNo;
  }

}
