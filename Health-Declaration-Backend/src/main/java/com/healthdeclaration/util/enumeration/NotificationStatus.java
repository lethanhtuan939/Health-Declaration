package com.healthdeclaration.util.enumeration;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum NotificationStatus {
    @JsonProperty("SENT")
    SENT,
    @JsonProperty("UNSENT")
    UNSENT,
    @JsonProperty("CANCELLED")
    CANCELLED;
}
