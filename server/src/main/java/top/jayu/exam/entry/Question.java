package top.jayu.exam.entry;

import lombok.Data;

import java.util.Date;

@Data
public class Question {
    private Integer id;

    private Integer questionType;

    private Integer sectionType;

    private Integer subjectType;

    private Integer languageType;

    private Date createTime;

    private String ower;

    private String tag;

    private String remark;

    private String question;

    private String answer;
}