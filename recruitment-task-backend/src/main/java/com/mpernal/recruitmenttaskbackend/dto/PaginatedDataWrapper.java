package com.mpernal.recruitmenttaskbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaginatedDataWrapper<T> {

    private List<T> result;
    private Long totalCount;


}