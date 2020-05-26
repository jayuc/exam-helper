package top.jayu.exam.entry;

import lombok.Data;

@Data
public class Code {
    private Integer id;

    private Integer codeType;

    private Integer codeNo;

    private String codeName;

    private Byte sortIndex;

    private Byte enableFlag;

    private String remark;
}