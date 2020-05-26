package top.jayu.exam.entry;

import lombok.Data;

@Data
public class CodeType {
    private Integer id;

    private Integer codeType;

    private String codeTypeName;

    private Byte enableFlag;
}