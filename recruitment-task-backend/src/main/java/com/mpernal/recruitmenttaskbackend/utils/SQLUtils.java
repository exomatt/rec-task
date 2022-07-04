package com.mpernal.recruitmenttaskbackend.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

public class SQLUtils {
    public static PageRequest getPageRequest(Integer page, Integer pageSize, String orderBy, String orderDirection) {
        PageRequest pageRequest;
        if (orderBy == null || orderBy.isEmpty()) {
            pageRequest = PageRequest.of(page, pageSize);
        } else {
            Sort sort = Sort.by(orderBy);
            if (orderDirection.equalsIgnoreCase("asc")) {
                sort = sort.ascending();
            } else {
                sort = sort.descending();
            }

            pageRequest = PageRequest.of(page, pageSize, sort);
        }

        return pageRequest;
    }
}