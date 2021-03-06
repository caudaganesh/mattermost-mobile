// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import KeyboardLayout from 'app/components/layout/keyboard_layout';
import PostList from 'app/components/post_list';
import PostTextbox from 'app/components/post_textbox';
import StatusBar from 'app/components/status_bar';
import {makeStyleSheetFromTheme} from 'app/utils/theme';

export default class Thread extends PureComponent {
    static propTypes = {
        actions: PropTypes.shape({
            handleCommentDraftChanged: PropTypes.func.isRequired,
            selectPost: PropTypes.func.isRequired
        }).isRequired,
        channelId: PropTypes.string.isRequired,
        navigator: PropTypes.object,
        myMember: PropTypes.object.isRequired,
        files: PropTypes.array,
        rootId: PropTypes.string.isRequired,
        draft: PropTypes.string.isRequired,
        theme: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired,
        statusBarHeight: PropTypes.number
    };

    state = {};

    componentWillReceiveProps(nextProps) {
        if (!this.state.lastViewedAt) {
            this.setState({lastViewedAt: nextProps.myMember.last_viewed_at});
        }
    }

    componentWillUnmount() {
        this.props.actions.selectPost('');
    }

    handleDraftChanged = (value) => {
        this.props.actions.handleCommentDraftChanged(this.props.rootId, value);
    };

    render() {
        const {
            channelId,
            draft,
            files,
            myMember,
            navigator,
            posts,
            rootId,
            statusBarHeight,
            theme
        } = this.props;
        const style = getStyle(theme);

        let height = 0;
        if (statusBarHeight > 20) {
            height = statusBarHeight - 20;
        }

        return (
            <KeyboardLayout
                behavior='padding'
                style={style.container}
                keyboardVerticalOffset={65 + height}
            >
                <StatusBar/>
                <PostList
                    indicateNewMessages={true}
                    posts={posts}
                    currentUserId={myMember.user_id}
                    lastViewedAt={this.state.lastViewedAt}
                    navigator={navigator}
                />
                <PostTextbox
                    rootId={rootId}
                    value={draft}
                    files={files}
                    channelId={channelId}
                    onChangeText={this.handleDraftChanged}
                    navigator={navigator}
                />
            </KeyboardLayout>
        );
    }
}

const getStyle = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.centerChannelBg
        }
    };
});
