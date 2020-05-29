package top.jayu.exam.param;

import lombok.Data;
import top.jayu.exam.entry.Question;

/**
 * Created by 余杰 on 2020/5/29 15:31
 */

@Data
public class QuestionParam extends Question implements BaseParam {
    private String userId;
    private int pageNumber;
    private int pageSize;
}
